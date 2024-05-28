import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { login } from "../auth";
import { showAlert, showNativeAlert } from "../../utils/alert";

function useLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, status } = useMutation({
    mutationFn: login,
  });
  useEffect(() => {
    if (status === "success") {
      showNativeAlert("Đăng nhập thành công");
      return;
    }
    if (status === "error") {
      showAlert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
    }
  }, [status]);
  const submit = () => {
    mutate({ phone, password });
  };
  return { setPhone, setPassword, submit, status };
}

export default useLogin;
