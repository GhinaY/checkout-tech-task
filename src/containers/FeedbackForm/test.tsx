/* eslint-disable react-refresh/only-export-components */
import userEvent from '@testing-library/user-event'
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FeedbackSubmissionsContextProvider } from '../../utils/feedback-submissions-context'
import FeedbackForm from './index'; 

const mockOnFormSubmission = vi.fn();

describe('FeedbackForm', () => {
  beforeEach(() => {
    render(
      <FeedbackSubmissionsContextProvider>
        <MemoryRouter>
          <FeedbackForm onFormSubmission={mockOnFormSubmission}/>
        </MemoryRouter>
      </FeedbackSubmissionsContextProvider>
    );
  });

  test('Renders the email field', () => {  
    const element = screen.getByRole('textbox', {name: /email/i});
    
    expect(element).toBeTruthy();
  });

  describe('Rendering elements', () => {
    test('Renders the name field', () => {  
      const element = screen.getByRole('textbox', {name: /name/i});
      
      expect(element).toBeTruthy();
    });
  
    test('Renders the email field', () => {  
      const element = screen.getByRole('textbox', {name: /email/i});
      
      expect(element).toBeTruthy();
    });

    test('Renders the comment field', () => {  
      const element = screen.getByRole('textbox', {name: /comment/i});
      
      expect(element).toBeTruthy();
    });

    test('Renders the rating field', () => {  
      const element = screen.getByTestId('ratingField');
      
      expect(element).toBeTruthy();
    });

    test('Renders the submit button', () => {  
      const element = screen.getByRole('button', {name: /submit/i});
      
      expect(element).toBeTruthy();
    });
  });

  describe('Validation on blur', () => {
    describe('Required rule', () => {
      test('Renders "This field is required" error messages when name field is blurred without a value', async () => {  
        const element = screen.getByLabelText(/name/i);
        await userEvent.click(element);

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.getByText('This field is required');
        expect(errorMessage).toBeTruthy();
      });

      test('Renders name field in error state when it is blurred without a value', async () => {  
        const element = screen.getByLabelText(/name/i);
        await userEvent.click(element);

        await act(async () => {
          await fireEvent.blur(element);
        });

        expect(element.getAttribute('aria-invalid')).toBe('true');
      });

      test('Renders "This field is required" error messages when email field is blurred without a value', async () => {  
        const element = screen.getByLabelText(/email/i);
        await userEvent.click(element);

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.getByText('This field is required');
        expect(errorMessage).toBeTruthy();
      });

      test('Renders email field in error state when it is blurred without a value', async () => {  
        const element = screen.getByLabelText(/email/i);
        await userEvent.click(element);

        await act(async () => {
          await fireEvent.blur(element);
        });

        expect(element.getAttribute('aria-invalid')).toBe('true');
      });

      test('Renders comment field in error state when it is blurred without a value', async () => {  
        const element = screen.getByLabelText(/comment/i);
        await userEvent.click(element);

        await act(async () => {
          await fireEvent.blur(element);
        });

        expect(element.getAttribute('aria-invalid')).toBe('true');
      });
    });

    describe('maxLength rules', () => {
      test('Does not render "Too long" error message for name field when value is shorter than 100 characters', async () => {  
        const element = screen.getByLabelText(/name/i);
        await userEvent.type(element, 'testing');

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.queryAllByText('Too long');
        expect(errorMessage.length).toBe(0);
      });

      test('Renders "Too long" error message for name field when value is longer than 100 characters', async () => {  
        const element = screen.getByLabelText(/name/i);
        await fireEvent.change(element, {target: {value: 't'.repeat(150)}}); // using fireEvent.change instead of userEvent.type for time efficiency

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.getByText('Too long');
        expect(errorMessage).toBeTruthy();
      });

      test('Does not render "Too long" error message for email field when value is shorter than 50 characters', async () => {  
        const element = screen.getByLabelText(/email/i);
        await userEvent.type(element, 'testing');

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.queryAllByText('Too long');
        expect(errorMessage.length).toBe(0);
      });

      test('Renders "Too long" error message for email field when value is longer than 50 characters', async () => {  
        const element = screen.getByLabelText(/email/i);
        await fireEvent.change(element, {target: {value: 't'.repeat(51)}}); // using fireEvent.change instead of userEvent.type for time efficiency

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.getByText('Too long');
        expect(errorMessage).toBeTruthy();
      });

      test('Does not render comment field in error state when value is shorter than 500 characters', async () => {  
        const element = screen.getByLabelText(/comment/i);
        await userEvent.type(element, 'testing');

        await act(async () => {
          await fireEvent.blur(element);
        });

        expect(element.getAttribute('aria-invalid')).toBe('false');
      });

      test('Renders comment field in error state when value is longer than 500 characters', async () => {  
        const element = screen.getByLabelText(/comment/i);
        await fireEvent.change(element, {target: {value: 't'.repeat(501)}}); // using fireEvent.change instead of userEvent.type for time efficiency

        await act(async () => {
          await fireEvent.blur(element);
        });

        expect(element.getAttribute('aria-invalid')).toBe('true');
      });
    });

    describe('Field-specific rules', () => {
      test('Renders "Please enter a valid email" error message for email field when value is does not match the email pattern', async () => {  
        const element = screen.getByLabelText(/email/i);
        await userEvent.type(element, 'testing');

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.getByText('Please enter a valid email');
        expect(errorMessage).toBeTruthy();
      });

      test('Does not render "Please enter a valid email" error message for email field when value matches the email pattern', async () => {  
        const element = screen.getByLabelText(/email/i);
        await userEvent.type(element, 'testing@test.com');

        await act(async () => {
          await fireEvent.blur(element);
        });

        const errorMessage = await screen.queryAllByText('Please enter a valid email');
        expect(errorMessage.length).toBe(0);
      });
    })
  });
});
