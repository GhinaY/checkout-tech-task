import { Navigate, createBrowserRouter } from 'react-router-dom';

export const paths = [
  {
    path: '/',
    element: <div>Feedback form page</div>,
  },
  {
    path: '/results',
    element: <div>Feedback results page</div>,
  },
  { 
    path: '*', 
    element: <Navigate to='/' replace /> },
]

const router = createBrowserRouter(paths);

export default router;
