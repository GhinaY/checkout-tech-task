import { useContext } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, SxProps, Typography } from '@mui/material';
import { FeedbackSubmissionsContext } from '../../utils/feedback-submissions-context';

export const PLACEHOLDER_TEXT = 'Hmm... Looks like there are no ratings to chart';

type ContainerStylingProps = SxProps;

function RatingsChart(containerStylingProps: ContainerStylingProps) {
  const { submissions, ratingsDistribution } = useContext(FeedbackSubmissionsContext);

  const formattedRatingsDistribution = Object.entries(ratingsDistribution).map(([rating, count]) => ({
    rating: `${rating} star`, 
    count
  }));
  
  return (
    <Card variant='outlined' sx={{
      p: 1,  
      minHeight: '100px',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      boxSizing: 'border-box',
      ...containerStylingProps // this allows the parent to style this container as needed
    }}>
      {/* ^ Default Card styling is just 'to taste', keeping responsiveness in mind */}

      {/* Added a placeholder message for visibility. 
      i.e. to keep the user informed of why there's no chart shown */}
      {submissions.length ? (
        <ResponsiveContainer aspect={1.5} data-testid='chart-container'>
          <BarChart data={formattedRatingsDistribution}>
            <XAxis dataKey='rating' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='count' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography align='center'>
          {PLACEHOLDER_TEXT}
        </Typography>
      )}
    </Card>
  );
}

export default RatingsChart;
