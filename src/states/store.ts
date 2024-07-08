import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slice/profile";
import socket from "./slice/socket";
import user from "./slice/user";
import register from "./slice/register";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    socket,
    user,
    register,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
