import { Navigate, createBrowserRouter } from 'react-router-dom';
import FormPage from '../../pages/FormPage';
import ResultsPage from '../../pages/ResultsPage';

export const paths = [
  {
    path: '/',
    element: <FormPage />,
  },
  {
    path: '/results',
    element: <ResultsPage />,
  },
  { 
    path: '*', 
    element: <Navigate to='/' replace /> },
]

const router = createBrowserRouter(paths);

export default router;
