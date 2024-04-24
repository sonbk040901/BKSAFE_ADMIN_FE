/* eslint-disable no-console */
import { Socket } from "socket.io-client";
import { connect as createConnect } from "./socket";
let socket: Socket;
let isConnecting = false;
export const connect = async () => {
  if (isConnecting) return;
  isConnecting = true;
  socket = await createConnect("booking");
  isConnecting = false;
  console.log(`Connected to booking socket`);
};
export const disconnect = () => {
  if (!socket) return;
  socket.disconnect();
  console.log(`Disconnected from booking socket`);
};
export const listenSuggestBooking = (cb: (bookingId: number) => void) => {
  socket.on("suggest", cb);
  console.log("Listening to suggest booking");
  return () => {
    socket.off("suggest", cb);
    console.log("Stopped listening to suggest booking");
  };
};
