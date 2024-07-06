import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ImagePickerAsset } from "expo-image-picker";
import { Driver, authApi, profileApi } from "../../api";
import { uploadImg } from "../../utils/upload";
import { RootState } from "../store";

interface ProfileState extends Omit<Driver, "location" | "rating"> {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  avatarSource: ImagePickerAsset | null;
}
const initialState: ProfileState = {
  id: 0,
  email: "",
  avatar: null,
  phone: "",
  gender: "OTHER",
  fullName: "",
  createdAt: "",
  updatedAt: "",
  status: "idle",
  error: null,
  address: "",
  birthday: "",
  avatarSource: null,
};
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  authApi.getProfile,
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (_: void, thunkApi) => {
    const state = (thunkApi.getState() as RootState).profile;
    try {
      const url = state.avatarSource
        ? await uploadImg(state.avatarSource)
        : state.avatar;
      await profileApi.update({
        avatar: url,
        fullName: state.fullName,
        email: state.email,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err); // eslint-disable-line
    }
  },
);
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    patchProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
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
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.status = "success";
      }),
});

export const { patchProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
