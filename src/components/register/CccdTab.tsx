import { Button } from "@rneui/themed";
import React, { type FC } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  RegisterState,
  patchRegister,
  patchRegisterCccd,
  selectRegisterCccd,
} from "../../states/slice/register";
import CustomDateInput from "../common/CustomDateInput";
import CustomInput from "../common/CustomInput";
import Icon from "../common/Icon";
import SelectImage from "../common/SelectImg";
import Title from "./Title";

interface CccdTabProps {}

const CccdTab: FC<CccdTabProps> = () => {
  const { backImageSource, frontImageSource } =
    useAppSelector(selectRegisterCccd);
  const dispatch = useAppDispatch();
  const handleChange =
    (key: keyof RegisterState["cccd"]) => (value: string) => {
      dispatch(patchRegisterCccd({ [key]: value }));
    };
  return (
    <View
      style={{
        paddingHorizontal: 10,
      }}
    >
      <Title title="Thông tin CCCD/CMND" />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SelectImage
          source={frontImageSource}
          label="Ảnh mặt trước"
          onChange={(img) => {
            dispatch(
              patchRegisterCccd({ frontImageSource: img, frontImage: img.uri }),
            );
          }}
        />
        <SelectImage
          source={backImageSource}
          label="Ảnh mặt sau"
          onChange={(img) => {
            dispatch(
              patchRegisterCccd({ backImageSource: img, backImage: img.uri }),
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
          leftIcon={<Icon name="idCard" />}
          placeholder="Số CCCD/CMND"
          onChangeText={handleChange("number")}
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
