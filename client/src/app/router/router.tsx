
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ROUTES } from '@/shared/enums/routes';
import { StartPage } from '@/pages';
import { BudgetPage } from '@/pages/BudgetPage/BudgetPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <StartPage />,
        
      },
      {
        path:ROUTES.BUDGETS,
        element:<BudgetPage/>
      }
     
    ]}

]) 
export default router;