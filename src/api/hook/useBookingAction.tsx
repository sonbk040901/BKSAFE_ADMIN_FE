import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "../";

interface UseBookingActionOptions {}

function useBookingAction({}: UseBookingActionOptions) {
  return useMutation({
    mutationFn: ({
      action,
      id,
    }: {
      action: "accept" | "reject" | "complete";
      id: number;
    }) => {
      if (action === "accept") {
        return bookingApi.acceptBooking(id);
      }
      if (action === "reject") {
        return bookingApi.rejectBooking(id);
      }
      return bookingApi.completeBooking(id);
    },
  });
}

export default useBookingAction;
