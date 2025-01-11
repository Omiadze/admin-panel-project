import { AUTH_PATHS } from "@/routes/admin/index.enum";
import React, { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const id = localStorage.getItem("userId");

  if (!id) {
    return <Navigate to={`/en/${AUTH_PATHS.LOGIN}`} />;
  }
  return children || <Outlet />;
};

export default AdminGuard;
