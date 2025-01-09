import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ROUTES } from '@/shared/enums/routes';
import { GoalPage } from '@/pages/GoalPage/GoalPage';
import { OperationsPage, StartPage,ParamsTransactionPage,BudgetsPage } from '@/pages';


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
        element:<BudgetsPage/>
      },
      {
        path:ROUTES.PARAMS_TRANSACTION,
        element:<ParamsTransactionPage/>
      },
      {
        path:ROUTES.ANALYTICS,
        element:<GoalPage/>
      },
      {
         path:ROUTES.OPERATIONS,
        element:<OperationsPage/>
      }
       
    ]}

]) 
export default router;