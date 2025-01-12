import { Outlet } from 'react-router-dom';

import AuthHeader from './header';

const AuthLayout = () => {
  return (
    <div>
      <AuthHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
