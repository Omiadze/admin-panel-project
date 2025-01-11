import { DASHBOARD_PATHS } from "@/routes/admin/index.enum";
import React, { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const id = localStorage.getItem("userId");

  if (id) {
    return <Navigate to={`/en/${DASHBOARD_PATHS.USERS}`} />;
  }
  return children || <Outlet />;
};

export default AuthGuard;
