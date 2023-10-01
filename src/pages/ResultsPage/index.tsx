import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import RatingsChart from '../../containers/RatingsChart';
import CommentsList from '../../containers/CommentsList';

function ResultsPage() {
  const navigate = useNavigate();

  return (
    <Stack m={{ xs: 2, md: 4 }} spacing={4} useFlexGap>

      {/* Dynamic stack that shows the title and Back button in a row on big screens,
      or in a column with the button on top on smaller screens */}
      <Stack 
        direction={{ xs: 'column-reverse', md: 'row' }}
        justifyContent='space-between' 
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2} 
      >
        <Typography variant='h2' component='h1'>Feedback Results</Typography>      
        <Button variant='outlined' onClick={() => navigate('/')}>Go back</Button>
      </Stack>

      <RatingsChart alignSelf='center' width='100%' maxWidth='500px'/>
      
      <Typography variant='h4' component='h2'>Latest Comments</Typography>
      <CommentsList />
    </Stack>
  );
}

export default ResultsPage;
