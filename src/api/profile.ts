import instance from "./axios";
import { Driver } from "./types";

export const update = async (dto: Partial<Driver>) => {
  const res = await instance.patch<unknown>("profile", dto);
  return res.data;
};
