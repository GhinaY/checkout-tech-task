/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react'
import { FeedbackSubmission } from '../../types';
import Comment from './index';

const mockSubmission: FeedbackSubmission = {
  name: 'test name',
  email: 'test@test.com',
  rating: 5,
  comment: 'test comment',
}

describe('Comment', () => {
  test('Renders the component correctly', () => {  
    const { asFragment } = render(
      <Comment {...mockSubmission} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
