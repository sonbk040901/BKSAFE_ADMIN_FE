import instance from "./axios";
import * as storage from "../utils/storage";
import { Account } from "./types";
export interface LoginDTO {
  phone: string;
  password: string;
}
export interface SignupDTO {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phone: string;
}

export const login = async (login: LoginDTO) => {
  const path = "auth/login";
  const res = await instance.post<string>(path, { ...login, role: "DRIVER" });
  const token = res.data;
  storage.storeData("token", token);
  return token;
};
export const signup = async (signup: SignupDTO) => {
  const path = "auth/signup";
  await instance.post(path, signup);
};
export const logout = async () => {
  const path = "auth/logout";
  const res = await instance.post<string>(path);
  await storage.removeData("token");
  await storage.removeData("user");
  return res.data;
};
export const getProfile = async () => {
  const path = "auth";
  const res = await instance.get<Account>(path);
  return res.data;
};
