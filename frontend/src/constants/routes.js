export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

export const AUTH_ROUTES = {
  REGISTER: `${BACKEND_URL}/api/v1/auth/register`,
  LOGIN: `${BACKEND_URL}/api/v1/auth/login`,
};
