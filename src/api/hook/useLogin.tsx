import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { login } from "../auth";
import { showAlert, showNativeAlert } from "../../utils/alert";

function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, status, error } = useMutation({
    mutationFn: login,
  });
  useEffect(() => {
    if (status === "success") {
      // setEmail("");
      // setPassword("");
      showNativeAlert("Đăng nhập thành công");
      return;
    }
    if (error) {
      showAlert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const submit = () => {
    mutate({ email, password });
  };
  return { setEmail, setPassword, submit, status };
}

export default useLogin;
