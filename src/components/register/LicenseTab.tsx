import { Button } from "@rneui/themed";
import { AxiosError } from "axios";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ErrorResponse, authApi } from "../../api";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  RegisterState,
  patchRegister,
  patchRegisterLicense,
  selectRegister,
  selectRegisterLicense,
} from "../../states/slice/register";
import { showNativeAlert } from "../../utils/alert";
import { uploadImg } from "../../utils/upload";
import CustomDateInput from "../common/CustomDateInput";
import CustomInput from "../common/CustomInput";
import Icon from "../common/Icon";
import SelectImage from "../common/SelectImg";
import Title from "./Title";

const LicenseTab = () => {
  const dispatch = useAppDispatch();
  const { frontImageSource, backImageSource } = useAppSelector(
    selectRegisterLicense,
  );
  const form = useAppSelector(selectRegister);
  const handleChange =
    (key: keyof RegisterState["license"]) => (value: string) => {
      dispatch(patchRegisterLicense({ [key]: value }));
    };
  const handleSubmit = async () => {
    try {
      dispatch(patchRegister({ status: "loading" }));
      const {
        backImageSource: cccdBack,
        frontImageSource: cccdFront,
        ...cccd
      } = form.cccd;
      const {
        backImageSource: licenseBack,
        frontImageSource: licenseFront,
        ...license
      } = form.license;
      if (!cccdFront || !cccdBack || !licenseBack || !licenseFront) {
        showNativeAlert("Vui lòng chụp ảnh CCCD và bằng lái");
        return;
      }
      if (checkEmpty(cccd) || checkEmpty(license) || checkEmpty({ ...form })) {
        showNativeAlert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const [cccdBackUrl, cccdFrontUrl, licenseBackUrl, licenseFrontUrl] =
        await Promise.all([
          uploadImg(cccdBack),
          uploadImg(cccdFront),
          uploadImg(licenseBack),
          uploadImg(licenseFront),
        ]);
      await authApi.signup({
        ...form,
        cccd: { ...cccd, frontImage: cccdFrontUrl, backImage: cccdBackUrl },
        license: {
          ...license,
          frontImage: licenseFrontUrl,
          backImage: licenseBackUrl,
        },
      });
      dispatch(patchRegister({ status: "success" }));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const mess = err.response?.data?.message;
      dispatch(
        patchRegister({
          status: "error",
          error: mess instanceof Array ? mess[0] : mess,
        }),
      );
    }
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
const checkEmpty = (obj: Record<string, unknown>) => {
  for (const key in obj) {
    if (obj[key] === "") return true;
  }
  return false;
};
