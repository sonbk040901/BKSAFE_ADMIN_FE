import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useLogin from "../../api/hook/useLogin";
import AuthWrapper from "../../components/AuthWrapper";
import CustomInput from "../../components/common/CustomInput";
import Icon from "../../components/common/Icon";
import { COLOR } from "../../constants/color";
import { useInitAppContext } from "../../hook/useInitApp";
import type { AuthNavigationProp } from "../../types/navigation";

const Login = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const phoneRef = useRef<PropsWithChildren<TextInput>>(null);
  const { setPhone, setPassword, submit, status, getError, clearError } =
    useLogin();
  const { data, refetch, isAuthenticated } = useInitAppContext();
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    if (status === "success") refetch();
  }, [refetch, status]);
  useEffect(() => {
    if (isAuthenticated && data) {
      navigation.replace("App");
    }
  }, [data, isAuthenticated, navigation]);
  useEffect(() => {
    const sto = setTimeout(() => {
      phoneRef.current?.focus();
    }, 500);
    return () => {
      clearTimeout(sto);
    };
  }, []);
  return (
    <AuthWrapper>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
            paddingBottom: 20,
          }}
        >
          Đăng nhập tài khoản
        </Text>
        <CustomInput
          ref={phoneRef}
          leftIcon={
            <Icon
              size={28}
              name="userPhone"
            />
          }
          width="95%"
          keyboardType="phone-pad"
          placeholder="Số điện thoại"
          errorText={getError("phone")}
          onChangeText={(v) => {
            clearError();
            setPhone(v);
          }}
        />
        <CustomInput
          leftIcon={
            <Icon
              size={28}
              name="lock"
            />
          }
          rightIcon={
            <TouchableOpacity onPress={() => setShowPass((v) => !v)}>
              <Icon
                size={28}
                name={showPass ? "hidden" : "view"}
              />
            </TouchableOpacity>
          }
          width="95%"
          placeholder="Mật khẩu"
          secureTextEntry={!showPass}
          errorText={getError("password")}
          onChangeText={(v) => {
            clearError();
            setPassword(v);
          }}
        />
        <Button
          titleStyle={{
            fontWeight: "bold",
            fontSize: 15,
            paddingHorizontal: 30,
          }}
          size="lg"
          disabled={status === "pending"}
          onPress={() => submit()}
        >
          Đăng nhập
        </Button>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 20,
            }}
          >
            Bạn chưa có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 20,
                color: COLOR.primary,
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
