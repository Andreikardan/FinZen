import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ROUTES } from '@/shared/enums/routes';
import { BudgetPage } from '@/pages/BudgetPage/BudgetPage';
import AuthGuard from './AuthGuard';

import { GoalPage } from '@/pages/GoalPage/GoalPage';
import { OperationsPage, StartPage,ParamsTransactionPage,BudgetsPage } from '@/pages';



export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: (<AuthGuard><StartPage /></AuthGuard>),
        
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