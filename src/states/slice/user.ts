import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../api";
import { RootState } from "../store";

interface UserState {
  id?: number;
  info?: User;
  status: "idle" | "loading" | "success" | "error";
}
const initialState: UserState = {
  status: "idle",
};
export const getUser = createAsyncThunk("user/detail", async () => 1);

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    patchUserId: (state, action: PayloadAction<number | undefined>) => {
      state.id = action.payload;
      if (action.payload === undefined) {
        state.info = undefined;
      }
    },
    patchUserInfo: (state, action: PayloadAction<User | undefined>) => {
      state.info = action.payload;
      state.id = action.payload?.id;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getUser.fulfilled, (state) => {
        state.status = "success";
      }),
});

export const { patchUserId, patchUserInfo } = userSlice.actions;
export const selectDriver = (state: RootState) => state.user;

export default userSlice.reducer;
