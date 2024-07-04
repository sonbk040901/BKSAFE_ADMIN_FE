import instance from "./axios";
import { Chat, User } from "./types";

export interface ChatDetalResponse {
  user: User;
  chats: Omit<Chat, "driver" | "user">[];
}

export const getChats = async () => {
  const res = await instance.get<Chat[]>("chats");
  return res.data;
};
export const getChatDetail = async (driverId: number) => {
  const res = await instance.get<ChatDetalResponse>(`chats/${driverId}`);
  return res.data;
};
