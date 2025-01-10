import { ROUTES } from '@/shared/enums/routes';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function UserGuard(): JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const {loading, isInitialized} = useAppSelector((state) => state.user);
  const location = useLocation();
  if (loading || !isInitialized) {
    return <div>Загрузка...</div>;
  }
  if (!user) {
    return (
      <Navigate
        to={ROUTES.HOME}
        state={{ from: location }}
        replace
      />
    );
  }
  return <Outlet />;
}