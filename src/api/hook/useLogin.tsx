import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LoginDTO, login } from "../auth";
import { showAlert, showNativeAlert } from "../../utils/alert";
import { ErrorResponse } from "../types";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../types/navigation";

function useLogin() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { mutate, status, error } = useMutation<
    string,
    AxiosError<ErrorResponse>,
    LoginDTO
  >({
    mutationFn: login,
  });
  useEffect(() => {
    if (status === "success") {
      showNativeAlert("Đăng nhập thành công");
      return;
    }
    if (error) {
      const data = error.response?.data;
      const mess = data?.message;
      if (data?.statusCode === 400) {
        setValidationErrors(data.message as string[]);
        return;
      }
      if (
        data?.statusCode === 409 &&
        typeof data.message === "string" &&
        data.message.includes("xác thực")
      ) {
        showAlert("Đăng nhập thất bại", "Tài khoản chưa được kích hoạt");
        setTimeout(() => {
          navigation.navigate("Active", { phone });
        }, 200);
        return;
      }
      showAlert(
        "Đăng nhập thất bại",
        typeof mess === "string" ? mess : mess?.[0],
      );
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const submit = () => {
    mutate({ phone: phone, password });
  };
  const getError = (field: "phone" | "password") => {
    const messField = field === "phone" ? "Số điện thoại" : "Mật khẩu";
    const error = validationErrors.find((e) => e.includes(messField));
    return error;
  };
  const clearError = () => {
    setValidationErrors([]);
  };
  return { setPhone, setPassword, submit, status, getError, clearError };
}

export default useLogin;
