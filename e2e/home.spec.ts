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
    await expect(page.getByText('Is valid')).not.toBeVisible()
    await expect(page.getByText('Is not valid')).not.toBeVisible()
  })

  getJsonExamples().forEach(({ text, description, isValid }) => {
    test.describe(`and the user enters a '${description}' into the input field`, () => {
      const validationText = isValid ? 'Is valid' : 'Is not valid'
      const oppositeValidationText = isValid ? 'Is not valid' : 'Is valid'

      test(`should show an '${validationText}' message`, async ({ page }) => {
        await page.getByLabel('Type or paste your json here...').fill(text)

        // TODO: fontawesome check mark is shown
        await expect(page.getByText(validationText)).toBeVisible()
        await expect(page.getByText(oppositeValidationText)).not.toBeVisible()
      })
    })
  })
})
