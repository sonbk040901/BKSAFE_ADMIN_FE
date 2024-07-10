import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  RegisterState,
  patchRegisterLicense,
  selectRegister,
  selectRegisterLicense,
} from "../../states/slice/register";
import CustomInput from "../common/CustomInput";
import Icon from "../common/Icon";
import SelectImage from "../common/SelectImg";
import Title from "./Title";
import { Button } from "@rneui/themed";
import CustomDateInput from "../common/CustomDateInput";
import { authApi } from "../../api";

const LicenseTab = () => {
  const dispatch = useAppDispatch();
  const { frontImageSource, backImageSource } = useAppSelector(
    selectRegisterLicense,
  );
  const state = useAppSelector(selectRegister);
  const handleChange =
    (key: keyof RegisterState["license"]) => (value: string) => {
      dispatch(patchRegisterLicense({ [key]: value }));
    };
  const handleSubmit = () => {
    authApi.signup(state).catch(console.log);
  };
  return (
    <View style={styles.container}>
      <Title title="Thông tin bằng lái xe" />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SelectImage
          source={frontImageSource}
          label="Ảnh mặt trước"
          onChange={(img) => {
            dispatch(
              patchRegisterLicense({
                frontImageSource: img,
                frontImage: img.uri,
              }),
            );
          }}
        />
        <SelectImage
          source={backImageSource}
          label="Ảnh mặt sau"
          onChange={(img) => {
            dispatch(
              patchRegisterLicense({
                backImageSource: img,
                backImage: img.uri,
              }),
            );
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <CustomInput
          leftIcon={<Icon name="user" />}
          placeholder="Họ và tên"
          onChangeText={handleChange("fullName")}
        />
        <CustomDateInput
          leftIcon={<Icon name="birthday" />}
          placeholder="Ngày sinh"
          onChangeDate={handleChange("birthday")}
        />
        <CustomInput
          leftIcon={<Icon name="driversLicense" />}
          placeholder="Số bằng lái xe"
          onChangeText={handleChange("number")}
        />
        <CustomInput
          leftIcon={<Icon name="truck" />}
          placeholder="Loại bằng lái xe (A, B, C, D, E)"
          onChangeText={handleChange("classType")}
        />
        <CustomInput
          leftIcon={<Icon name="location" />}
          placeholder="Nơi cấp"
          onChangeText={handleChange("address")}
        />
        <CustomDateInput
          leftIcon={<Icon name="calendar" />}
          placeholder="Ngày cấp"
          onChangeDate={handleChange("issueDate")}
        />
        <CustomDateInput
          leftIcon={<Icon name="expired" />}
          placeholder="Ngày hết hạn"
          onChangeDate={handleChange("expireDate")}
        />
      </View>
      <Button onPress={handleSubmit}>Đăng ký</Button>
    </View>
  );
};

export default LicenseTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
