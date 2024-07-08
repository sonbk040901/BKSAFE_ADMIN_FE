import React, { type FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  patchRegister,
  patchRegisterCccd,
  selectRegisterCccd,
} from "../../states/slice/register";
import * as ImagePicker from "expo-image-picker";
import { Button, Image, Input } from "@rneui/themed";
import { COLOR, IMAGE } from "../../constants";

interface CccdTabProps {}

const CccdTab: FC<CccdTabProps> = () => {
  const { backImageSource, frontImageSource } =
    useAppSelector(selectRegisterCccd);
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
              patchRegisterCccd({
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
              patchRegisterCccd({
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
          dispatch(patchRegisterCccd({ fullName: v }));
        }}
        // leftIcon={{
        //   name: "lock",
        //   type: "font-awesome",
        //   // color: COLOR.primary,
        // }}
        // leftIcon={
        //   <Image
        //     source={IMAGE.user}
        //     style={{
        //       width: 25,
        //       height: 25,
        //       objectFit: "cover",
        //     }}
        //   />
        // }
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
          dispatch(patchRegisterCccd({ birthday: v }));
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
          dispatch(patchRegisterCccd({ number: v }));
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
          dispatch(patchRegisterCccd({ address: v }));
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
          dispatch(patchRegisterCccd({ issueDate: v }));
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
          dispatch(patchRegisterCccd({ expireDate: v }));
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
        // disabled={status === "pending"}
        onPress={() => dispatch(patchRegister({ tab: 2 }))}
      >
        Tiếp tục
      </Button>
    </View>
  );
};

export default CccdTab;
