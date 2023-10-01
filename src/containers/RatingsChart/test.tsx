/* eslint-disable react-refresh/only-export-components */
import { render, screen } from '@testing-library/react'
import { FeedbackSubmissionsContext } from '../../utils/feedback-submissions-context';
import { FeedbackSubmission, RatingsDistribution } from '../../types';
import { PLACEHOLDER_TEXT } from './index'
import RatingsChart from './index';
import { BarChart, ResponsiveContainerProps } from 'recharts';

vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual!,
    ResponsiveContainer: (props: ResponsiveContainerProps) => <div>{props.children}</div>,
    BarChart: vi.fn().mockImplementation(() => <div>BarChart component</div>),
  }
})

const mockBarChart = vi.mocked(BarChart);

const mockSubmission: FeedbackSubmission = {
  name: 'test name',
  email: 'test@test.com',
  rating: 5,
  comment: 'test comment',
};

const mockRatingsDistribution: RatingsDistribution = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

describe('RatingsChart', () => {
  const mockSubmissionsList = Array(10).fill(mockSubmission);

  const renderComponent = (
    submissions: FeedbackSubmission[], 
    ratingsDistribution: RatingsDistribution
  ) => {
    return render(
      <FeedbackSubmissionsContext.Provider value={{ 
        submissions,
        ratingsDistribution,
        addNewSubmission: vi.fn() 
      }}>
        <RatingsChart />
      </FeedbackSubmissionsContext.Provider>
    );
  };

  afterEach(() =>{
    mockBarChart.mockClear()
  });

  test('Matches screenshot', () => {
    const { asFragment } = renderComponent(mockSubmissionsList, mockRatingsDistribution);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Transforms the data share correctly', () => {
    renderComponent(mockSubmissionsList, mockRatingsDistribution);

    expect(mockBarChart).toHaveBeenLastCalledWith(expect.objectContaining({ 
      data: [
        {
          rating: '1 star',
          count: 1
        },
        {
          rating: '2 star',
          count: 2
        },{
          rating: '3 star',
          count: 3
        },{
          rating: '4 star',
          count: 4
        },{
          rating: '5 star',
          count: 5
        },
      ]
    } ), expect.anything());
  });

  describe('If no submissions are available', () => {
    test('Does not render chart components', () => {
      renderComponent([], mockRatingsDistribution);
      const result = screen.queryAllByTestId('chart-container');
      expect(result.length).toBe(0)
    });

    test('Shows placeholder text', () => {
      renderComponent([], mockRatingsDistribution);
      const result = screen.getByText(PLACEHOLDER_TEXT);
      
      expect(result.textContent).toBeTruthy();
    });
  })
});
