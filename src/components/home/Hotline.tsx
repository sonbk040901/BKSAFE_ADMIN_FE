import React, { FC } from "react";
import { Image, TouchableOpacity } from "react-native";
import { IMAGE } from "../../constants/image";
import { STYLE } from "../../constants/theme";

interface HotlineProps {}

const Hotline: FC<HotlineProps> = () => {
  return (
    <TouchableOpacity
      style={[
        {
          position: "absolute",
          right: 20,
          bottom: 20,
          padding: 5,
          backgroundColor: "#ffd6d6",
          borderRadius: 50,
        },
        STYLE.shadow,
      ]}
    >
      <Image
        height={10}
        width={10}
        resizeMode="contain"
        style={{
          width: 50,
          height: 50,
        }}
        source={IMAGE.hotline}
      />
    </TouchableOpacity>
  );
};

export default Hotline;
