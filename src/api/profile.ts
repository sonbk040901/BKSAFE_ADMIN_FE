import instance from "./axios";
import { Account } from "./types";

export const update = async (dto: Partial<Account>) => {
  const res = await instance.patch<unknown>("profile", dto);
  return res.data;
};
