import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

type Props = {
  email: string,
  comment: string,
};

function Comment({email, comment}: Props) {
  return (
    <Stack m={{ xs: 2, md: 4 }} useFlexGap>
      <Typography 
        variant='subtitle1' 
        sx={{ fontWeight: 'bold', color: 'text.secondary' }}
      >
        {email}
      </Typography>      
      <Typography>{comment}</Typography>      
    </Stack>
  );
}

export default Comment;
