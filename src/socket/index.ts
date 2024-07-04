/* eslint-disable no-console */
import { io, Socket } from "socket.io-client";
import { getData } from "../utils/storage";
const { EXPO_PUBLIC_BACKEND_URL: BASE_URL, EXPO_PUBLIC_BACKEND_PORT: PORT } =
  process.env;
export const ENDPOINT = PORT ? `${BASE_URL}:${PORT}` : `${BASE_URL}`;
export const connect = async (path: string = "") => {
  const token = await getData("token");
  const socket = io(`${ENDPOINT}/${path}`, {
    extraHeaders: {
      authorization: token,
    },
  });
  return socket;
};
type EventsMapping = {
  booking: {
    subcribe: "suggest";
    emit: never;
  };
  driver: {
    subcribe: never;
    emit: "update-location";
  };
  chat: {
    subcribe: "new-chat";
    emit: "new-chat";
  };
};
export type SocketNameSpace = keyof EventsMapping;
export type SocketSubcribeEvent<T = SocketNameSpace> = T extends SocketNameSpace
  ? `${T}/${EventsMapping[T]["subcribe"]}`
  : never;

export type SocketEmitEvent<T = SocketNameSpace> = T extends SocketNameSpace
  ? `${T}/${EventsMapping[T]["emit"]}`
  : never;
const sockets: Record<SocketNameSpace, Socket | undefined> = {
  booking: undefined,
  driver: undefined,
  chat: undefined,
};
export const createConnect = async () => {
  sockets.booking = await connect("booking");
  sockets.driver = await connect("driver");
  sockets.chat = await connect("chat");
  console.log("Connected to all namespaces");
};
export const disconnect = () => {
  const { booking, driver, chat } = sockets;
  if (booking) booking.disconnect();
  if (driver) driver.disconnect();
  if (chat) chat.disconnect();
  console.log("Disconnected to all namespaces");
};

export const subcribe = <D = unknown>(
  event: SocketSubcribeEvent,
  cb: (data: D) => void,
) => {
  const [namespace, eventName] = event.split("/") as [SocketNameSpace, string];
  const socket = sockets[namespace];
  if (!socket) return () => 0;
  socket.on(eventName, cb);
  console.log("Subcribe: ", event);
  return () => {
    socket.off(eventName, cb);
    console.log("Unsubcribe: ", event);
  };
};
export const emit = <T = unknown, D = unknown>(
  event: SocketEmitEvent,
  payload: T,
  cb: (data: D) => void = () => 0,
) => {
  const [namespace, eventName] = event.split("/") as [SocketNameSpace, string];
  const socket = sockets[namespace];
  if (!socket) return;
  socket.emit(eventName, payload, cb);
};
