export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

export const AUTH_ROUTES = {
  REGISTER: `${BACKEND_URL}/api/v1/auth/register`,
  LOGIN: `${BACKEND_URL}/api/v1/auth/login`,
  SEND_OTP: `${BACKEND_URL}/api/v1/auth/send-otp`,
  VERIFY_OTP: `${BACKEND_URL}/api/v1/auth/verify-otp`,
  RESET_PASSWORD: `${BACKEND_URL}/api/v1/auth/reset-password`,
};

export const USER_ROUTES = {
  CURRENT_USER: `${BACKEND_URL}/api/v1/user/current-user`,
};
