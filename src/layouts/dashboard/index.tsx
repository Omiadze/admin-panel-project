import { useAuthContext } from '@/context/hooks/use-auth-context';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './header';

const DashboardLayout = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div>
      <DashboardHeader />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
