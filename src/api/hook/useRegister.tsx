import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useReducer } from "react";
import { showAlert, showNativeAlert } from "../../utils/alert";
import { signup, type SignupDTO } from "../auth";
import { type ErrorResponse } from "../types";
const initialState: SignupDTO & {
  confirm: string;
  validationErrors: string[];
} = {
  phone: "",
  password: "",
  confirm: "",
  email: "",
  fullName: "",
  address: "",
  birthday: new Date(),
  validationErrors: [],
};
type Action = {
  type: "phone" | "pass" | "confirm" | "email" | "name" | "error";
  payload?: unknown;
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "phone":
      return { ...state, phone: action.payload as string };
    case "pass":
      return { ...state, password: action.payload as string };
    case "confirm":
      return { ...state, confirm: action.payload as string };
    case "email":
      return { ...state, email: action.payload as string };
    case "name":
      return { ...state, fullName: action.payload as string };
    case "error":
      return { ...state, validationErrors: action.payload as string[] };
    default:
      return state;
  }
};

function useRegister() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate, status, error } = useMutation<
    void,
    AxiosError<ErrorResponse>,
    SignupDTO
  >({
    mutationFn: signup,
  });
  useEffect(() => {
    if (status === "success") {
      showNativeAlert("Đăng ký thành công");
      return;
    }
    if (error) {
      const data = error.response?.data;
      const mess = data?.message;
      if (data?.statusCode === 400) {
        dispatch({ type: "error", payload: data.message });
        return;
      }
      showAlert(
        "Đăng ký thất bại",
        typeof mess === "string" ? mess : mess?.[0],
      );
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const submit = () => {
    // eslint-disable-next-line
    const { confirm, validationErrors, ...rest } = state;
    if (rest.password !== confirm) {
      dispatch({
        type: "error",
        payload: ["Mật khẩu xác nhận không trùng khớp"],
      });
      return;
    }
    mutate(rest);
  };
  const getError = (
    field: "phone" | "password" | "email" | "name" | "confirm",
  ) => {
    const messField =
      field === "phone"
        ? "Số điện thoại"
        : field === "password"
        ? "Mật khẩu"
        : field === "email"
        ? "Email"
        : field === "confirm"
        ? "Mật khẩu xác nhận"
        : "Họ và tên";
    console.log(state.validationErrors);

    const error = state.validationErrors.find((e) => e.includes(messField));
    return error;
  };
  const clearError = () => {
    dispatch({ type: "error", payload: [] });
  };
  return { ...state, dispatch, submit, status, getError, clearError };
}

export default useRegister;
