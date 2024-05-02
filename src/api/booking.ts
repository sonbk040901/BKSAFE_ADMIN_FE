import instance from "./axios";
import { Booking } from "./types";
export const getBooking = async (id: number) => {
  const path = `driver/bookings/${id}`;
  const res = await instance.get<Booking>(path);
  return res.data;
};
export const getReceiveBooking = async () => {
  const path = "driver/bookings/receive";
  const res = await instance.get<Booking>(path);
  return res.data;
};
export const getCurrentBooking = async () => {
  const path = "driver/bookings/current";
  const res = await instance.get<Booking>(path);
  return res.data;
};
export const acceptBooking = async (id: number) => {
  const path = `driver/bookings/${id}/accept`;
  const res = await instance.post(path);
  return res.data;
};
export const rejectBooking = async (id: number) => {
  const path = `driver/bookings/${id}/reject`;
  const res = await instance.post(path);
  return res.data;
};
export const completeBooking = async (id: number) => {
  const path = `driver/bookings/${id}/complete`;
  const res = await instance.post(path);
  return res.data;
};
