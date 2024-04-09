import { io } from "socket.io-client";
import { getData } from "../utils/storage";
export const ENDPOINT = `${process.env.EXPO_PUBLIC_BACKEND_URL}:${process.env.EXPO_PUBLIC_BACKEND_PORT}`;
export const connect = async (path: string = "") => {
  const token = await getData("token");
  const socket = io(`${ENDPOINT}/${path}`, {
    extraHeaders: {
      authorization: token,
    },
  });
  return socket;
};
