export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

export const AUTH_ROUTES = {
  REGISTER: `${BACKEND_URL}/api/v1/auth/register`,
  LOGIN: `${BACKEND_URL}/api/v1/auth/login`,
  SEND_OTP: `${BACKEND_URL}/api/v1/auth/send-otp`,
  VERIFY_OTP: `${BACKEND_URL}/api/v1/auth/verify-otp`,
  RESET_PASSWORD: `${BACKEND_URL}/api/v1/auth/reset-password`,
  LOGOUT: `${BACKEND_URL}/api/v1/auth/logout`,
};

export const USER_ROUTES = {
  CURRENT_USER: `${BACKEND_URL}/api/v1/user/current-user`,
};

export const SHOP_ROUTES = {
  GET_MY_SHOP: `${BACKEND_URL}/api/v1/shop/get-my-shop`,
  CREATE_SHOP: `${BACKEND_URL}/api/v1/shop/create`,
  EDIT_SHOP: (id) => `${BACKEND_URL}/api/v1/shop/edit/${id}`,
  GET_SHOP_BY_ID: (id) => `${BACKEND_URL}/api/v1/shop/get-shop/${id}`,
  GET_ALL_SHOPS: `${BACKEND_URL}/api/v1/shop/get-all-shops`,
};
