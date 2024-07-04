export interface ErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export interface PagingAndSortDto {
  take?: number;
  skip?: number;
  order?: "asc" | "desc" | "ASC" | "DESC";
  sort?: string;
}
export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  type: "PICKUP" | "DROP_OFF" | "STOP";
  bookingId: number;
  id: number;
}
export interface Note {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
}
type Gender = "OTHER" | "MALE" | "FEMALE";
export interface Account {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  phone: string;
  fullName: string;
  avatar: string | null;
  gender: Gender;
}
export interface Driver extends Account {
  name: string;
  phone: string;
  email: string;
  rating: number;
  birthday: string;
  address: string;
  location: Location;
}
export interface User extends Account {}
export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "RECEIVED"
  | "REJECTED"
  | "CANCELLED"
  | "DRIVING"
  | "COMPLETED";
export interface Booking {
  locations: Location[];
  notes: Note[];
  price: number;
  userId: number;
  note: string;
  rating: number | null;
  startTime: string | null;
  endTime: string | null;
  nextLocationId: number | null;
  driverId: number | null;
  driver: Driver | null;
  user: User;
  id: number;
  createdAt: string;
  updatedAt: string;
  status: BookingStatus;
}

export interface Noti {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: number;
  message: string;
  createdAt: string;
  userId: number;
  driverId: number;
  user: User;
  driver: Driver;
  isDriver: boolean;
}
