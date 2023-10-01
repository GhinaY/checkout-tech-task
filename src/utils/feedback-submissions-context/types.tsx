import { FeedbackSubmission, RatingsDistribution } from '../../types'

export type FeedbackSubmissionsContextType = {
  addNewSubmission: (newSubmission: FeedbackSubmission) => void,
  ratingsDistribution: RatingsDistribution,
  submissions: FeedbackSubmission[],
}
