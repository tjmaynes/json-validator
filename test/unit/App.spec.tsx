import {describe, it, expect, beforeEach} from 'vitest';
import {fireEvent, render, screen} from "@testing-library/react";
import {getJsonExamples} from "../helpers/fixtures";
import App from "@src/App";

describe('App', () => {
    beforeEach(() => {
        render(<App />);
    })

    getJsonExamples().forEach(({ text, description,  isValid }) => {
        describe(`when the user enters a '${description}' into the input field`, () => {
            const validationText = isValid ? 'Is valid' : 'Is not valid'
            const oppositeValidationText = isValid ? 'Is not valid' : 'Is valid'

            it(`should show an '${validationText}' message`, async () => {
                const validationInput = screen.getByLabelText('Enter your json:')

                fireEvent.change(validationInput, {target: {value: text}})

                expect(screen.getByText(validationText)).toBeVisible()
                expect(screen.queryByText(oppositeValidationText)).not.toBeInTheDocument()
            });
        });
    });
});