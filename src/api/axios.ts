import axios from "axios";
import { getData } from "../utils/storage";
const URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const PORT = process.env.EXPO_PUBLIC_BACKEND_PORT;
const BASE_URL = PORT ? `${URL}:${PORT}/driver` : `${URL}/driver`;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getData("token");
  // if (token) {
  config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export default axiosInstance;
