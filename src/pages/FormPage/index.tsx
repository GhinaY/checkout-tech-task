import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import FeedbackForm from '../../containers/FeedbackForm'

function FormPage() {
  const navigate = useNavigate();
  
  const onFormSubmission = () => {
    navigate('/results');
  };

  return (
    <Stack m={{ xs: 2, md: 4 }} spacing={2} useFlexGap>
      <Typography variant='h2' component='h1'>Feedback Form</Typography>
      <FeedbackForm onFormSubmission={onFormSubmission}/>
    </Stack>
  )
}

export default FormPage;
