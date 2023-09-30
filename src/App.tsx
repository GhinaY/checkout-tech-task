import { RouterProvider } from 'react-router-dom'
import router from './utils/router'
import { FeedbackSubmissionsContextProvider } from './utils/feedback-submissions-context'

function App() {

  return (
    <FeedbackSubmissionsContextProvider>
      <RouterProvider router={router} />
    </FeedbackSubmissionsContextProvider>
  )
}

export default App
