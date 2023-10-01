import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Comment from '../../components/Comment';
import { FeedbackSubmissionsContext } from '../../utils/feedback-submissions-context';
import { SxProps } from '@mui/system';

export const PLACEHOLDER_TEXT = 'Hmm... Looks like there are no comments to show';

// Including SxProps allows the parent to style the container as needed
export type Props = SxProps & {
  commentCount?: number,
};

function CommentsList({ commentCount = 3, ...containerStylingProps }: Props) {
  const { submissions } = useContext(FeedbackSubmissionsContext);

  return (
    <Stack spacing={2} divider={<Divider variant='middle' sx={{...containerStylingProps}} />}>
      {/* ^ Column stack that wraps the comments 
      and dynamically adds dividers between each two comments */}

      {/* Added a placeholder message for visibility. 
      i.e. to keep the user informed of why there's no comments shown */}
      {submissions.length ? 
        submissions.slice(-commentCount).map((submission, i) => (
          <Comment {...submission} key={i}/>
        )) : (
        <Typography>
          {PLACEHOLDER_TEXT}
        </Typography>
      )}
    </Stack>
  );
}

export default CommentsList;
