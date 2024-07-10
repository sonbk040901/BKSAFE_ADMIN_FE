import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { ImagePickerAsset } from "expo-image-picker";
import { SignupDTO } from "../../api/auth";
import type { RootState } from "../store";

export interface RegisterState extends SignupDTO {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  confirmPassword: string;
  showPassword: boolean;
  cccd: SignupDTO["cccd"] & {
    frontImageSource: ImagePickerAsset | null;
    backImageSource: ImagePickerAsset | null;
  };
  license: SignupDTO["license"] & {
    frontImageSource: ImagePickerAsset | null;
    backImageSource: ImagePickerAsset | null;
  };
  tab: number;
}
const initialState: RegisterState = {
  showPassword: false,
  email: "",
  phone: "",
  fullName: "",
  status: "idle",
  error: null,
  // address: "",
  password: "",
  confirmPassword: "",
  cccd: {
    address: "",
    backImage: "",
    birthday: "",
    expireDate: "",
    frontImage: "",
    fullName: "",
    issueDate: "",
    number: "",
    backImageSource: null,
    frontImageSource: null,
  },
  license: {
    address: "",
    backImage: "",
    birthday: "",
    classType: "",
    expireDate: "",
    frontImage: "",
    fullName: "",
    issueDate: "",
    number: "",
    backImageSource: null,
    frontImageSource: null,
  },
  tab: 0,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    patchRegister: (state, action: PayloadAction<Partial<RegisterState>>) => {
      return { ...state, ...action.payload };
    },
    patchRegisterCccd: (
      state,
      action: PayloadAction<Partial<RegisterState["cccd"]>>,
    ) => {
      return { ...state, cccd: { ...state.cccd, ...action.payload } };
    },
    patchRegisterLicense: (
      state,
      action: PayloadAction<Partial<RegisterState["license"]>>,
    ) => {
      return { ...state, license: { ...state.license, ...action.payload } };
    },
  },
});

export const { patchRegister, patchRegisterLicense, patchRegisterCccd } =
  registerSlice.actions;
export const selectRegister = (state: RootState) => state.register;
export const selectRegisterCccd = createSelector(
  selectRegister,
  (state) => state.cccd,
);
export const selectRegisterLicense = createSelector(
  selectRegister,
  (state) => state.license,
);

export default registerSlice.reducer;
