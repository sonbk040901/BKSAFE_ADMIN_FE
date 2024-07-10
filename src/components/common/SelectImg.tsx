import { Image } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/image";

type SelectImageProps = {
  source?: ImagePicker.ImagePickerAsset | null;
  label?: string;
} & (
  | {
      multiple?: false;
      onChange?: (image: ImagePicker.ImagePickerAsset) => void;
    }
  | {
      multiple: true;
      onChange?: (image: ImagePicker.ImagePickerAsset[]) => void;
    }
);

const SelectImage = (props: SelectImageProps) => {
  const { onChange, multiple, source, label } = props;
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "center",
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: COLOR.secondaryBackground,
        borderRadius: 10,
        overflow: "hidden",
      }}
      onPress={async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: true,
          quality: 0.5,
        });
        if (!res.assets || !res.assets.length) return;
        if (multiple) {
          onChange?.(res.assets);
        } else {
          onChange?.(res.assets[0]);
        }
      }}
    >
      <Image
        style={{
          height: 100,
          width: "100%",
          objectFit: "cover",
        }}
        containerStyle={{
          height: 100,
          width: "100%",
          backgroundColor: "#ebf4ffff",
        }}
        source={source ?? undefined}
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
            fontWeight: "500",
            textShadowColor: COLOR.dark,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 2,
          }}
        >
          {label}
        </Text>
        <Image
          source={IMAGE.camera}
          style={{ width: 30, height: 30 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SelectImage;
