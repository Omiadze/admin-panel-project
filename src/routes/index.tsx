import { Navigate, Route, Routes } from "react-router-dom";
import { ADMIN_ROUTES } from "./admin";
import NotFoundPage from "@/pages/404";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication Layout */}
      <Route path="/" element={<Navigate to={"/en"} />} />

      {...ADMIN_ROUTES}

      {/* Dashboard Layout */}

      {/* Catch-All Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
