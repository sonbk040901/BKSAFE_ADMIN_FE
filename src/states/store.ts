import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slice/profile";
import socket from "./slice/socket";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    socket,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
