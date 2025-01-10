import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "../index.enum";
import UsersPage from "@/pages/dashboard/users-page";
import DashboardLayout from "@/layouts/dashboard";
import CreateUserPage from "@/pages/dashboard/create-user";
import UpdateUserPage from "@/pages/dashboard/update-user";

export const DASHBOARD_ROUTES = [
  <Route
    path=":lang"
    element={
      //   <AdminGuard>
      <DashboardLayout />
      //   </AdminGuard>
    }
  >
    {/* Users Routes */}
    <Route path={DASHBOARD_PATHS.USERS} element={<UsersPage />} />
    <Route path={DASHBOARD_PATHS.USERS_CREATE} element={<CreateUserPage />} />
    <Route path={DASHBOARD_PATHS.USERS_UPDATE} element={<UpdateUserPage />} />
  </Route>,
];
