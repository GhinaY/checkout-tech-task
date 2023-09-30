/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { FeedbackSubmissionsContext, FeedbackSubmissionsContextProvider } from './index'

const mockSubmission = {
  name: 'test name',
  email: 'test@test.com',
  rating: 5,
  comment: 'test comment',
}

const TestConsumer = () => {
  const { 
    addNewSubmission, 
    ratingsDistribution,
    submissions,
  } = useContext(FeedbackSubmissionsContext);

  return (
    <>
      Number of submissions: {submissions.length}
      {submissions.map((submission, i) => (
          <span key={i}>{submission.email}: {submission.comment}</span>
      ))}
      {Object.entries(ratingsDistribution).map(
        ([rating, count]) => (
            <span key={rating}>{rating}: {count}</span>
        )
      )}
      <button onClick={() => addNewSubmission(mockSubmission)}>
          Add new submission
      </button>
    </>
  )
}
describe('FeedbackSubmissionsContextProvider', () => {
  beforeEach(() => {
    render(
      <FeedbackSubmissionsContextProvider>
        <TestConsumer />
      </FeedbackSubmissionsContextProvider>
    );
  });

  test('Provides initial ratingsDistribution correctly', () => {  
    const text = screen.getByText(
      /1: 0/i
    );
    expect(text.textContent).toBeTruthy()
  })

  test('Provides initial submissions list correctly', () => {  
    const text = screen.getByText(
      /Number of submissions: 0/i
    );
    expect(text.textContent).toBeTruthy()
  })

  describe('addNewSubmission value', () => {
    test('updates ratingsDistribution values', async () => {  
      const initialText = screen.getByText(
        /5: 0/i
      );
      expect(initialText.textContent).toBeTruthy()

      fireEvent.click(screen.getByText(/Add new submission/i));

      const updatedText = screen.getByText(
        /5: 1/i
      );
      
      expect(updatedText.textContent).toBeTruthy();
    })

    test('updates submissions values', () => {  
      const initialListLengthText = screen.getByText(
        /Number of submissions: 0/i
      );

      expect(initialListLengthText.textContent).toBeTruthy()

      fireEvent.click(screen.getByText(/Add new submission/i));

      const updatedListLengthText = screen.getByText(
        /Number of submissions: 1/i
      );
      const updatedListValueText = screen.getByText(
        /test@test.com: test comment/i
      );

      expect(updatedListLengthText.textContent).toBeTruthy()
      expect(updatedListValueText.textContent).toBeTruthy()
    })
  });
});
