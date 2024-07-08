import { Button, Input } from "@rneui/themed";
import React, { type FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLOR } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../states";
import { patchRegister, selectRegister } from "../../states/slice/register";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../types/navigation";

interface InfoTabProps {}

const InfoTab: FC<InfoTabProps> = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { showPassword } = useAppSelector(selectRegister);
  const dispatch = useAppDispatch();
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text
        style={{
          fontWeight: "500",
          color: COLOR.secondary,
          marginBottom: 10,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        Thông tin cá nhân
      </Text>
      <Input
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegister({ phone: v }));
        }}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        leftIcon={{
          name: "phone",
          type: "font-awesome",
          // color: COLOR.primary,
        }}
        // errorMessage={getError("phone")}
        leftIconContainerStyle={{
          marginRight: 10,
        }}
        inputContainerStyle={{
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: COLOR.secondaryBackground,
        }}
      />
      <Input
        inputContainerStyle={{
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: COLOR.secondaryBackground,
        }}
        placeholder="Mật khẩu"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegister({ password: v }));
        }}
        secureTextEntry={!showPassword}
        leftIcon={{
          name: "lock",
          type: "font-awesome",
          // color: COLOR.primary,
        }}
        leftIconContainerStyle={{
          marginRight: 10,
        }}
        rightIcon={{
          name: showPassword ? "eye" : "eye-slash",
          type: "font-awesome",
          // color: COLOR.primary,
          onPress: () =>
            dispatch(patchRegister({ showPassword: !showPassword })),
        }}
      />
      <Input
        inputContainerStyle={{
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: COLOR.secondaryBackground,
        }}
        placeholder="Mật khẩu xác nhận"
        // errorMessage={getError("confirm")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegister({ confirmPassword: v }));
        }}
        secureTextEntry={!showPassword}
        leftIcon={{
          name: "lock",
          type: "font-awesome",
          // color: COLOR.primary,
        }}
        leftIconContainerStyle={{
          marginRight: 10,
        }}
        rightIcon={{
          name: showPassword ? "eye" : "eye-slash",
          type: "font-awesome",
          // color: COLOR.primary,
          onPress: () =>
            dispatch(patchRegister({ showPassword: !showPassword })),
        }}
      />
      <Input
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegister({ fullName: v }));
        }}
        placeholder="Họ và tên"
        leftIcon={{
          name: "user",
          type: "ant-design",
          // color: COLOR.primary,
        }}
        // errorMessage={getError("name")}
        leftIconContainerStyle={{
          marginRight: 10,
        }}
        inputContainerStyle={{
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: COLOR.secondaryBackground,
        }}
      />
      <Input
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegister({ email: v }));
        }}
        placeholder="Email"
        keyboardType="email-address"
        leftIcon={{
          name: "mail",
          type: "entypo",
          // color: COLOR.primary,
        }}
        // errorMessage={getError("email")}
        leftIconContainerStyle={{
          marginRight: 10,
        }}
        inputContainerStyle={{
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: COLOR.secondaryBackground,
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
