import { bookingApi } from "../";
import useFetch from "./useFetch";

function useCurrentBooking() {
  const { data: booking, ...rest } = useFetch({
    fetchFn: () => bookingApi.getCurrentBooking(),
  });
  return { booking, ...rest };
}

export default useCurrentBooking;
