import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import { ROUTES } from "@/shared/enums/routes";
import AuthGuard from "./AuthGuard";
import UserGuard from "./UserGuard";
import { GoalPage } from "@/pages/GoalPage/GoalPage";
import {
  OperationsPage,
  StartPage,
  ParamsTransactionPage,
  BudgetsPage,
  SettingsPage,
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <AuthGuard>
            <StartPage />
          </AuthGuard>
        ),
      },
      {
        element: <UserGuard />,
        children: [
          {
            path: ROUTES.BUDGETS,
            element: <BudgetsPage />,
          },
          {
            path: ROUTES.PARAMS_TRANSACTION,
            element: <ParamsTransactionPage />,
          },
          {
            path: ROUTES.ANALYTICS,
            element: <GoalPage />,
          },
          {
            path: ROUTES.OPERATIONS,
            element: <OperationsPage />,
          },
          {
            path: ROUTES.SETTINGS,
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
