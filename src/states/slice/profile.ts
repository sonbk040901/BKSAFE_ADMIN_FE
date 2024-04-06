import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Account, authApi } from "../../api";
import { RootState } from "../store";

interface ProfileState extends Account {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}
const initialState: ProfileState = {
  id: 0,
  email: "",
  avatar: null,
  username: "",
  phone: "",
  gender: "OTHER",
  driver: null,
  fullName: "",
  createdAt: "",
  updatedAt: "",
  status: "idle",
  error: null,
};
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  authApi.getProfile,
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        return { ...state, status: "success", ...action.payload };
      }),
});

export const { updateProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
