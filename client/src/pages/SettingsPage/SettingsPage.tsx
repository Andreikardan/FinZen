import { useAppSelector } from '@/shared/hooks/reduxHooks';
import CollapseComponent from './test';
import UserCard from './UserCard';
import styles from './SettingsPage.module.css'

export function SettingsPage() {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.confety}>
      <UserCard user={user} />
      <CollapseComponent />
    </div>
  );
}