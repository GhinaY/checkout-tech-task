import { FeedbackSubmission } from '../../types'

export type RatingsDistribution = {
  [key: number]: number,
}

export type FeedbackSubmissionsContextType = {
  addNewSubmission: (newSubmission: FeedbackSubmission) => void,
  ratingsDistribution: RatingsDistribution,
  submissions: FeedbackSubmission[],
}
