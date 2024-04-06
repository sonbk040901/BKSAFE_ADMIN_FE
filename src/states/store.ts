import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/booking";
import profileReducer from "./slice/profile";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    profile: profileReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
