import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React, { useRef, type FC } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLOR } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  RegisterState,
  patchRegister,
  selectRegister,
} from "../../states/slice/register";
import { AuthNavigationProp } from "../../types/navigation";
import CustomDateInput from "../common/CustomDateInput";
import CustomInput from "../common/CustomInput";
import Icon from "../common/Icon";
import Title from "./Title";

interface InfoTabProps {}

const InfoTab: FC<InfoTabProps> = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { showPassword } = useAppSelector(selectRegister);
  const phoneRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const handleChange =
    <T extends keyof RegisterState>(key: T) =>
    (value: RegisterState[T]) => {
      dispatch(patchRegister({ [key]: value }));
    };
  return (
    <View
      style={{
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
          paddingBottom: 20,
        }}
      >
        Đăng ký tài khoản
      </Text>
      <Title title="Thông tin cá nhân" />
      <CustomInput
        ref={phoneRef}
        leftIcon={
          <Icon
            size={28}
            name="userPhone"
          />
        }
        keyboardType="phone-pad"
        placeholder="Số điện thoại"
        // errorText={getError("phone")}
        onChangeText={(v) => {
          // clearError();
          handleChange("phone")(v);
        }}
      />
      <CustomInput
        leftIcon={
          <Icon
            size={28}
            name="email"
          />
        }
        keyboardType="email-address"
        placeholder="Email"
        // errorText={getError("email")}
        onChangeText={(v) => {
          // clearError();
          handleChange("email")(v);
        }}
      />
      <CustomInput
        leftIcon={
          <Icon
            size={28}
            name="user"
          />
        }
        placeholder="Họ và tên"
        // errorText={getError("name")}
        onChangeText={(v) => {
          // clearError();
          handleChange("fullName")(v);
        }}
      />

      <CustomDateInput
        leftIcon={<Icon name="birthday" />}
        placeholder="Ngày sinh"
        onChangeDate={handleChange("birthday")}
      />
      <CustomInput
        leftIcon={
          <Icon
            size={28}
            name="lock"
          />
        }
        rightIcon={
          <TouchableOpacity
            onPress={() => handleChange("showPassword")(!showPassword)}
          >
            <Icon
              size={28}
              name={showPassword ? "hidden" : "view"}
            />
          </TouchableOpacity>
        }
        placeholder="Mật khẩu"
        secureTextEntry={!showPassword}
        // errorText={getError("password")}
        onChangeText={(v) => {
          // clearError();
          handleChange("password")(v);
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
          <TouchableOpacity
            onPress={() => handleChange("showPassword")(!showPassword)}
          >
            <Icon
              size={28}
              name={showPassword ? "hidden" : "view"}
            />
          </TouchableOpacity>
        }
        placeholder="Mật khẩu xác nhận"
        secureTextEntry={!showPassword}
        // errorText={getError("confirm")}
        onChangeText={(v) => {
          // clearError();
          handleChange("confirmPassword")(v);
        }}
      />

      <Button
        titleStyle={{
          fontWeight: "bold",
          fontSize: 20,
          paddingHorizontal: 30,
        }}
        size="sm"
        raised
        // disabled={status === "pending"}
        onPress={() => dispatch(patchRegister({ tab: 1 }))}
      >
        Tiếp tục
      </Button>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text
          style={{
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          Bạn đã có tài khoản?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 20,
              color: COLOR.primary,
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfoTab;
