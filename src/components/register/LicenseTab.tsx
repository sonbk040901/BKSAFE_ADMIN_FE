import { Button, Image, Input } from "@rneui/themed";
import { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { type FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ErrorResponse, authApi } from "../../api";
import { COLOR, IMAGE } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  patchRegister,
  patchRegisterLicense,
  selectRegister,
} from "../../states/slice/register";
import { showNativeAlert } from "../../utils/alert";
import { uploadImg } from "../../utils/upload";

interface LicenseTabProps {}

const LicenseTab: FC<LicenseTabProps> = () => {
  const form = useAppSelector(selectRegister);
  const { frontImageSource, backImageSource } = form.license;
  const dispatch = useAppDispatch();
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
        Thông tin CCCD/CMND
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={async () => {
            const res = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              base64: true,
              quality: 0.5,
            });
            const uri = res.assets?.[0].uri;
            if (!uri) return;
            dispatch(
              patchRegisterLicense({
                frontImageSource: res.assets?.[0],
                frontImage: uri,
              }),
            );
          }}
        >
          <Image
            style={{
              height: 100,
              width: "100%",
              borderRadius: 10,
              objectFit: "cover",
              borderWidth: 0.4,
              borderColor: COLOR.secondaryBackground,
            }}
            containerStyle={{
              height: 100,
              width: "90%",
            }}
            source={frontImageSource ?? undefined}
          />

          <View
            style={{
              position: "absolute",
              width: "90%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLOR.white,
                fontWeight: "600",
                textShadowColor: COLOR.dark,
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
              }}
            >
              Ảnh mặt trước
            </Text>
            <Image
              source={IMAGE.camera}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={async () => {
            const res = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              base64: true,
              quality: 0.5,
            });
            const uri = res.assets?.[0].uri;
            if (!uri) return;
            dispatch(
              patchRegisterLicense({
                backImageSource: res.assets?.[0],
                backImage: uri,
              }),
            );
          }}
        >
          <Image
            source={backImageSource ?? undefined}
            style={{
              height: 100,
              width: "100%",
              borderRadius: 10,
              objectFit: "cover",
              borderWidth: 0.4,
              borderColor: COLOR.secondaryBackground,
            }}
            containerStyle={{
              height: 100,
              width: "90%",
            }}
          />

          <View
            style={{
              position: "absolute",
              width: "90%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLOR.white,
                fontWeight: "600",
                textShadowColor: COLOR.dark,
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
              }}
            >
              Ảnh mặt sau
            </Text>
            <Image
              source={IMAGE.camera}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Input
        inputContainerStyle={{
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: COLOR.secondaryBackground,
        }}
        placeholder="Họ và tên"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegisterLicense({ fullName: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        leftIconContainerStyle={{
          marginRight: 10,
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
        placeholder="Ngày sinh"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegisterLicense({ birthday: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        leftIconContainerStyle={{
          marginRight: 10,
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
        placeholder="Số bằng lái"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegisterLicense({ number: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        leftIconContainerStyle={{
          marginRight: 10,
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
        placeholder="Loại bằng lái"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegisterLicense({ classType: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        leftIconContainerStyle={{
          marginRight: 10,
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
        placeholder="Nơi cấp"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegisterLicense({ address: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        leftIconContainerStyle={{
          marginRight: 10,
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
        placeholder="Ngày cấp"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegisterLicense({ issueDate: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        leftIconContainerStyle={{
          marginRight: 10,
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
        placeholder="Ngày hết hạn"
        // errorMessage={getError("password")}
        onChangeText={(v) => {
          // clearError();
          dispatch(patchRegisterLicense({ expireDate: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        leftIconContainerStyle={{
          marginRight: 10,
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
        disabled={form.status === "loading"}
        onPress={handleSubmit}
      >
        Đăng ký
      </Button>
    </View>
  );
};

export default LicenseTab;

const checkEmpty = (obj: Record<string, unknown>) => {
  for (const key in obj) {
    if (obj[key] === "") return true;
  }
  return false;
};
