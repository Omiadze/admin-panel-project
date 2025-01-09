import { AUTH_ROUTES } from "./auth";
import { DASHBOARD_ROUTES } from "./dashboard";

export const ADMIN_ROUTES = [...AUTH_ROUTES, ...DASHBOARD_ROUTES];
