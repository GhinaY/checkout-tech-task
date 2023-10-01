export type FeedbackSubmission = {
  name: string,
  email: string,
  rating: number,
  comment: string,
};

export type RatingsDistribution = {
  [key: number]: number,
};
