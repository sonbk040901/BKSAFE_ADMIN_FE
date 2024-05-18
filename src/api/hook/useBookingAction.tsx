import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "../";

interface UseBookingActionOptions {}

function useBookingAction({}: UseBookingActionOptions) {
  return useMutation({
    mutationFn: ({
      action,
      id,
    }: {
      action: "accept" | "reject" | "start" | "complete";
      id: number;
    }) => {
      if (action === "accept") {
        return bookingApi.acceptBooking(id);
      }
      if (action === "reject") {
        return bookingApi.rejectBooking(id);
      }
      if (action === "start") return bookingApi.startBooking(id);
      return bookingApi.completeBooking(id);
    },
  });
}

export default useBookingAction;
