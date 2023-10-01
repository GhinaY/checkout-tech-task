import { Navigate, createBrowserRouter } from 'react-router-dom';
import FormPage from '../../pages/FormPage';

export const paths = [
  {
    path: '/',
    element: <FormPage />,
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
