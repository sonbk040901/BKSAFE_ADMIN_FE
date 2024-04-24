import { bookingApi } from "..";
import useFetch from "./useFetch";

interface UseBookingReceiveOptions {
  bookingId: number;
}

function useBookingReceive({ bookingId }: UseBookingReceiveOptions) {
  const { data: booking, ...rest } = useFetch({
    fetchFn: () => bookingApi.getBooking(bookingId),
  });
  return { booking, ...rest };
}

export default useBookingReceive;
