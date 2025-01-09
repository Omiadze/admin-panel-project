import { Route } from "react-router-dom";
import Login from "@/pages/login";
import { AUTH_PATHS } from "../index.enum";
import { lazy } from "react";

const AuthLayout = lazy(() => import("@/layouts/auth"));

export const AUTH_ROUTES = [
  <Route path={`:lang/${AUTH_PATHS.LOGIN}`} element={<AuthLayout />}>
    <Route
      index
      element={
        // <AuthGuard>
        <Login />
        // </AuthGuard>
      }
    />
  </Route>,
];
