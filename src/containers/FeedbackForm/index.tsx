import Stack from '@mui/material/Stack';
import { useCallback, useContext } from 'react';
import { useForm, SubmitHandler, Controller, ValidationRule } from 'react-hook-form'
import { FeedbackSubmissionsContext } from '../../utils/feedback-submissions-context';
import { FeedbackSubmission } from '../../types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ControlledTextFieldProps } from './types';
import Rating from '@mui/material/Rating';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const ratingPattern = /^[1-5]{1}$/;
const requiredRule = (value: boolean = true): ValidationRule<boolean> => 
  ({value, message: 'This field is required'});

type Props = {
  onFormSubmission: () => void,
};

function FeedbackForm({onFormSubmission}: Props) {
  const { addNewSubmission } = useContext(FeedbackSubmissionsContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeedbackSubmission>({
    defaultValues: {
      name: '',
      email: '',
      rating: 0,
      comment: '',
    },
    mode: 'onBlur',
  })
  
  const onSubmit: SubmitHandler<FeedbackSubmission> = (data) => {
    addNewSubmission(data);
    onFormSubmission();
  }

  // this is a reusable component for all the text fields in the form
  const ControlledTextField = useCallback(({
    name, 
    fieldError, 
    helperText,
    required = true, 
    maxLength = 100,
    additionalRules = {},
    ...textFieldProps
  }: ControlledTextFieldProps) => (
    <Controller
      name={name}
      control={control}
      rules={{ 
        required: requiredRule(required), 
        maxLength: {value: maxLength, message: 'Too long'},
        ...additionalRules  // allows parent to provide additional rules for a given instance
      }}
      render={({ field }) => 
        <TextField 
          {...field}
          {...textFieldProps}
          id={name}
          fullWidth
          error={!!fieldError} 
          helperText={helperText ? helperText : fieldError && fieldError?.message}
        />
      }
    />
  ), [control]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Column stack that wraps the fields with the submit button */}
      <Stack spacing={{ xs: 2, md: 4 }}>

        {/* Stack that wraps all the fields. In small screens, all the fields appear as a column,
        but on larger screens, this stack moves the comment field to a separate columns. */}
        <Stack 
          spacing={{ xs: 2, md: 4 }} 
          alignItems='stretch' 
          justifyContent='center' 
          width='100%' 
          direction={{ xs: 'column', md: 'row' }}
        >

          {/* Column stack that wraps all the short fields */}
          <Stack spacing={{ xs: 2, md: 4 }} width='100%'>
            <ControlledTextField name='name' label='Name' fieldError={errors.name} />

            {/* Emails need additional validation rules as their length can't 
            exceed 50 characters and they have to satisfy the given regex pattern */}
            <ControlledTextField name='email' label='Email' fieldError={errors.email} 
              maxLength={50} 
              additionalRules={{
                pattern: {
                  value: emailPattern,
                  message: 'Please enter a valid email',
                }
              }}
            />
            
            {/* The rating field with its label and helper text that shows errors, if any */}
            <div>
              {/* Row stack that shows the label and ratings field side by side */}
              <Stack direction='row' gap={2}>
                <FormLabel>Rating:</FormLabel>
                
                {/* Rating field requires additional validation to ensure its an int between 1-5 */}
                {/* It also requires a custom onChange to parse the value as an Int */}
                <Controller
                  name={'rating'}
                  control={control}
                  rules={{ 
                    required: requiredRule(), 
                    validate: (v) => ratingPattern.test(String(v)) || 'Invalid rating',
                  }}
                  render={({ field }) => 
                    <Rating 
                      {...field} 
                      data-testid='ratingField'
                      onChange={(event) => 
                        field.onChange(parseInt((event.target as HTMLInputElement).value))
                      } 
                    />
                  }
                />
              </Stack>
              {/* The rating field error message as a conditional helperText */}
              {errors.rating && (<FormHelperText error>{errors.rating?.message}</FormHelperText>)}
            </div>
          </Stack>

          {/* Comment field has a longer max character limit, custom styling and 
          shows the character count */}
          <ControlledTextField 
            name='comment' 
            label='Comment' 
            fieldError={errors.comment} 
            maxLength={500} 
            helperText={(watch('comment').length) + '/500'}
            multiline
            rows={7}
          />
        </Stack>
        <Button variant='contained' type='submit' sx={{ alignSelf: 'flex-end' }}>Submit</Button>
      </Stack>
    </form>
  )
}

export default FeedbackForm;
