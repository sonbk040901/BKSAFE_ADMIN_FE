/* eslint-disable no-console */
import { io, type Socket } from "socket.io-client";
import { getData } from "../utils/storage";
export const ENDPOINT = `${process.env.EXPO_PUBLIC_BACKEND_URL}:${process.env.EXPO_PUBLIC_BACKEND_PORT}`;
export const connect = async (path: SocketNameSpace) => {
  const token = await getData("token");
  const socket = io(`${ENDPOINT}/${path}`, {
    extraHeaders: {
      authorization: token,
    },
  });
  return socket;
};

export type SocketNameSpace = "booking" | "driver";
export type BookingSubcribeEvent = "suggest";
export type BookingEmitEvent = "";
export type DriverEmitEvent = "update-location";
export type DriverSubcribeEvent = "";
export type SocketSubcribeEvent =
  | `booking/${BookingSubcribeEvent}`
  | `driver/${DriverSubcribeEvent}`;
export type SocketEmitEvent =
  | `booking/${BookingEmitEvent}`
  | `driver/${DriverEmitEvent}`;
const sockets: Record<SocketNameSpace, Socket | undefined> = {
  booking: undefined,
  driver: undefined,
};
export const createConnect = async () => {
  sockets.booking = await connect("booking");
  sockets.driver = await connect("driver");
  console.log("Connected to all namespaces");
};
export const disconnect = () => {
  const { booking, driver } = sockets;
  if (booking) booking.disconnect();
  if (driver) driver.disconnect();
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
