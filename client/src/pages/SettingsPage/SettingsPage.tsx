import { useAppSelector } from '@/shared/hooks/reduxHooks';
import CollapseComponent from './test';
import UserCard from './UserCard';

export function SettingsPage() {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserCard user={user} />
      <CollapseComponent />
    </>
  );
}