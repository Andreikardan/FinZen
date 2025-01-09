import { ROUTES } from '@/shared/enums/routes';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthGuard({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();
  if (user) {
    return (
      <Navigate
        to={ROUTES.BUDGETS}
        state={{ from: location }}
        replace
      />
    );
  }
  return <>{children}</>;
}
