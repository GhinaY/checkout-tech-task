/* eslint-disable react-refresh/only-export-components */
import { render, screen } from '@testing-library/react'
import { FeedbackSubmissionsContext } from '../../utils/feedback-submissions-context';
import { FeedbackSubmission } from '../../types';
import CommentsList, { PLACEHOLDER_TEXT, Props } from './index'

vi.mock('../../components/Comment', () => {
  return {
    default: () => <div>test comment</div>
  }
})

const mockSubmission: FeedbackSubmission = {
  name: 'test name',
  email: 'test@test.com',
  rating: 5,
  comment: 'test comment',
}

describe('CommentList', () => {
  const mockSubmissionsList = Array(10).fill(mockSubmission);

  const renderComponent = (submissions: FeedbackSubmission[], componentProps?: Props) => {
    return render(
      <FeedbackSubmissionsContext.Provider value={{ 
        submissions, 
        ratingsDistribution: {}, 
        addNewSubmission: vi.fn() 
      }}>
        <CommentsList {...componentProps} />
      </FeedbackSubmissionsContext.Provider>
    );
  };

  test('Shows the number of comments specified', () => {
    renderComponent(mockSubmissionsList, {commentCount: 10});
    const result = screen.getAllByText(
      /test comment/i
    );
    expect(result.length).toBe(10);
  });

  test('Shows 3 comments by default if no number is specified', () => {
    renderComponent(mockSubmissionsList);
    const result = screen.getAllByText(
      /test comment/i
    );
    expect(result.length).toBe(3);
  });

  test('Matches screenshot', () => {
    const { asFragment } = renderComponent(mockSubmissionsList);

    expect(asFragment()).toMatchSnapshot();
  });

  describe('If no submissions are available', () => {
    test('Does not render Comment components', () => {
      renderComponent([]);
      const result = screen.queryAllByText(
        /test comment/i
      );
      expect(result.length).toBe(0);
    });

    test('Shows placeholder text', () => {
      renderComponent([]);
      const result = screen.getAllByText(PLACEHOLDER_TEXT);
      
      expect(result.length).toBe(1);
    });
  })
});
