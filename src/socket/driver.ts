/* eslint-disable no-console */
import { Socket } from "socket.io-client";
import { connect as createConnect } from "./socket";
let socket: Socket;
let isConnecting = false;
export const connect = async () => {
  if (isConnecting) return;
  isConnecting = true;
  socket = await createConnect("driver");
  isConnecting = false;
  console.log(`Connected to driver socket`);
};
export const disconnect = () => {
  if (!socket) return;
  socket.disconnect();
  console.log(`Disconnected from driver socket`);
};
interface UpdateLocationBody {
  address?: string;
  latitude: number;
  longitude: number;
}
export const emitUpdateLocation = (
  location: UpdateLocationBody,
  cb: (val: unknown) => void = () => {},
) => {
  if (!socket) return;
  socket.emit("update-location", location, cb);
};
