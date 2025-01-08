import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ROUTES } from '@/shared/enums/routes';
import { AuthPage } from '@/pages';
import { BudgetPage } from '@/pages/BudgetPage/BudgetPage';
import { ParamsTransactionPage } from '@/pages/ParamsTransactionsPage/ParamsTransactionPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout/>,
    children: [
      {
        path: ROUTES.AUTH,
        element: <AuthPage />,
        
      },
      {
        path:ROUTES.BUDGETS,
        element:<BudgetPage/>
      },
      {
        path:ROUTES.PARAMS_TRANSACTION,
        element:<ParamsTransactionPage/>
      }
     
    ]}

]) 
export default router;