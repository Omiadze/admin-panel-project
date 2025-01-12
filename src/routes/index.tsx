import { Navigate, Route, Routes } from "react-router-dom";
import { ADMIN_ROUTES } from "./admin";
import NotFoundPage from "@/pages/404";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/en/users"} />} />

      {...ADMIN_ROUTES}

      {/* Catch-All Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
