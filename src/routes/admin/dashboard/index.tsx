import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "../index.enum";
// import UsersPage from "@/pages/dashboard/users-page";
// import CreateUserPage from "@/pages/dashboard/create-user";
// import UpdateUserPage from "@/pages/dashboard/update-user";
import AdminGuard from "@/components/route-guards/dashboard";
import { lazy, Suspense } from "react";
import DashboardLayout from "@/layouts/dashboard";
import Loading from "@/components/loading";

// const DashboardLayout = lazy(() => import("@/layouts/dashboard"));
const UsersPage = lazy(() => import("@/pages/dashboard/users-page"));
const CreateUserPage = lazy(() => import("@/pages/dashboard/create-user"));
const UpdateUserPage = lazy(() => import("@/pages/dashboard/update-user"));

export const DASHBOARD_ROUTES = [
  <Route
    path=":lang"
    element={
      <AdminGuard>
        <DashboardLayout />
      </AdminGuard>
    }
  >
    <Route
      path={DASHBOARD_PATHS.USERS}
      element={
        <Suspense fallback={<Loading />}>
          <UsersPage />
        </Suspense>
      }
    />
    <Route
      path={DASHBOARD_PATHS.USERS_CREATE}
      element={
        <Suspense fallback={<Loading />}>
          <CreateUserPage />
        </Suspense>
      }
    />
    <Route
      path={DASHBOARD_PATHS.USERS_UPDATE}
      element={
        <Suspense fallback={<Loading />}>
          <UpdateUserPage />
        </Suspense>
      }
    />
  </Route>,
];
