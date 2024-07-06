import instance from "./axios";
import {
  Booking,
  BookingStatus,
  PagingAndSortDto,
  PagingAndSortResponse,
} from "./types";
export interface FindAllBookingDTO extends PagingAndSortDto {
  status?: BookingStatus;
  time?: string;
}

export const getAll = async (findAll: Type<FindAllBookingDTO>) => {
  const path = "bookings";
  const res = await instance.get<PagingAndSortResponse<Booking>>(path, {
    params: findAll,
  });
  return res.data;
};

export const getOne = async (id: number) => {
  const path = `bookings/${id}`;
  const res = await instance.get<Booking>(path);
  return res.data;
};

export const getBooking = async (id: number) => {
  const path = `bookings/${id}`;
  const res = await instance.get<Booking>(path);
  return res.data;
};
export const getReceiveBooking = async () => {
  const path = "bookings/receive";
  const res = await instance.get<Booking>(path);
  return res.data;
};
export const getCurrentBooking = async () => {
  const path = "bookings/current";
  const res = await instance.get<Booking>(path);
  return res.data;
};
export const acceptBooking = async (id: number) => {
  const path = `bookings/${id}/accept`;
  const res = await instance.patch(path);
  return res.data;
};
export const rejectBooking = async (id: number) => {
  const path = `bookings/${id}/reject`;
  const res = await instance.patch(path);
  return res.data;
};
export const startBooking = async (id: number) => {
  const path = `bookings/${id}/start`;
  const res = await instance.patch(path);
  return res.data;
};

export const completeBooking = async (id: number) => {
  const path = `bookings/${id}/complete`;
  const res = await instance.patch(path);
  return res.data;
};
