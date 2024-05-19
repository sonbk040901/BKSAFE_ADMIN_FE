import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface SocketState {
  status: "loading" | "connected" | "disconnected" | "failed";
}
const initialState: SocketState = {
  status: "loading",
};
export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connect: (state) => {
      state.status = "connected";
    },
    disconnect: (state) => {
      state.status = "disconnected";
    },
  },
});
export const selectSocket = (state: RootState) => state.socket;
export const selectSocketStatus = createSelector(
  selectSocket,
  (socket) => socket.status,
);
export const { connect, disconnect } = socketSlice.actions;
export default socketSlice.reducer;
