import { FieldError, ValidationRule } from 'react-hook-form';
import { FeedbackSubmission } from '../../types';
import { TextFieldProps } from '@mui/material/TextField';

export type ControlledTextFieldProps = TextFieldProps  & {
  name: keyof FeedbackSubmission,
  fieldError: FieldError | undefined,
  helperText?: string,
  required?: boolean,
  maxLength?: number,
  additionalRules?: {[key: string]: ValidationRule },
};
