import { Outlet } from 'react-router-dom';
import DashboardHeader from './header';

const DashboardLayout = () => {
  return (
    <div>
      <DashboardHeader />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
