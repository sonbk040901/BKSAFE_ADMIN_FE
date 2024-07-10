import instance from "./axios";
import * as storage from "../utils/storage";
import { Account, Cccd, License } from "./types";
export interface LoginDTO {
  phone: string;
  password: string;
}
export interface SignupDTO {
  password: string;
  email: string;
  fullName: string;
  phone: string;
  address?: string;
  birthday?: string;
  cccd: Omit<Cccd, "id">;
  license: Omit<License, "id">;
}
export interface ActiveDTO {
  phone: string;
  activationCode: string;
}

export const login = async (login: LoginDTO) => {
  const path = "auth/login";
  const res = await instance.post<string>(path, { ...login, role: "DRIVER" });
  const token = res.data;
  storage.storeData("token", token);
  return token;
};
export const active = async (active: ActiveDTO) => {
  const path = "auth/active";
  await instance.patch(path, active);
};
export const signup = async (signup: SignupDTO) => {
  const path = "auth/register";
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
