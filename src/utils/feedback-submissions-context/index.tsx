import React, { createContext, useState } from 'react';
import { FeedbackSubmission, RatingsDistribution } from '../../types';
import { FeedbackSubmissionsContextType } from './types';

export const FeedbackSubmissionsContext = createContext<FeedbackSubmissionsContextType>(null!);

const initialRatingsDistribution: RatingsDistribution = [1,2,3,4,5].reduce((obj, rating) => {
  return {
    ...obj,
    [rating]: 0,
  };
}, {});

interface Props {
  children: React.ReactNode;
}

export const FeedbackSubmissionsContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);
  const [ratingsDistribution, setRatingsDistribution] = useState(initialRatingsDistribution);

  // adds the new submission to the list and increases the ratingsDistribution counters as needed
  const addNewSubmission = (newSubmission: FeedbackSubmission) => {
    // in a real production app, this would more realistically be an API call to save to a real database
    // for this purely-frontend app though, a context works fine
    setSubmissions(submissions.concat(newSubmission));

    // increase the counter for the rating submitted by 1
    const newRatingValue = newSubmission.rating;
    const newRatingsDistribution = {
      ...ratingsDistribution,
      [newRatingValue]: (ratingsDistribution[newRatingValue] ?? 0) + 1,
    }
    setRatingsDistribution(newRatingsDistribution)
  };

  return (
    <FeedbackSubmissionsContext.Provider value={{ addNewSubmission, ratingsDistribution, submissions }}>
      {children}
    </FeedbackSubmissionsContext.Provider>
  );
};
