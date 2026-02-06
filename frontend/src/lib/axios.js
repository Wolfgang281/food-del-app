import axios from "axios";
import { BACKEND_URL } from "../constants/routes";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;
