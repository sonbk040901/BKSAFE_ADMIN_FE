import instance from "./axios";
import { Noti } from "./types";
export const getAll = async () => {
  const res = await instance.get<Noti[]>("notifications");
  return res.data;
};
