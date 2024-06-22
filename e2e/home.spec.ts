import { test, expect } from '@playwright/test'
import { getJsonExamples } from './fixtures'

test.describe('when a user navigates to the homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/JSON Validator/)
  })

  test('does not show a json validation status message', async ({ page }) => {
    await expect(page.getByText('👍')).not.toBeVisible()
    await expect(page.getByText('👎')).not.toBeVisible()
  })

  getJsonExamples().forEach(({ text, description, isValid }) => {
    test.describe(`and the user enters a '${description}' into the input field`, () => {
      const validationText = isValid ? '👍' : '👎'
      const oppositeValidationText = isValid ? '👎' : '👍'

      test(`should show an '${validationText}' message`, async ({ page }) => {
        await page.getByLabel('Type or paste your json here...').fill(text)

        await expect(page.getByText(validationText)).toBeVisible()
        await expect(page.getByText(oppositeValidationText)).not.toBeVisible()
      })
    })
  })

  test('should copy json to clipboard when copy button clicked', async ({
    page,
    browserName,
  }) => {
    const expected = '[{"hello" : "world"}, {"green": "red"}]'

    await page.getByLabel('Type or paste your json here...').fill(expected)

    await page.getByLabel('Copy').click()

    if (!['webkit', 'Desktop Safari', 'Mobile Safari'].includes(browserName)) {
      const handle = await page.evaluateHandle(() =>
        navigator.clipboard.readText()
      )
      const clipboardContent = await handle.jsonValue()
      expect(clipboardContent).toEqual(expected)
    }
  })

  test('should prettify unpretty json input when pretty button clicked and input is valid', async ({
    page,
  }) => {
    const expectedOutput = `[
   {
      "hello": "world"
   },
   {
      "green": "red"
   }
]`

    await page
      .getByLabel('Type or paste your json here...')
      .fill('[ {"hello" : "world"}, { "green": "red"}]')

    await expect(page.getByText('👍')).toBeVisible()

    await page.getByLabel('Pretty').click()

    await expect(
      page
        .getByPlaceholder('Type or paste your json here...')
        .getByText(expectedOutput)
    ).toBeVisible()
    await expect(page.getByText('👍')).toBeVisible()
  })

  test('pretty button is disabled when input is invalid ', () => {})
})
