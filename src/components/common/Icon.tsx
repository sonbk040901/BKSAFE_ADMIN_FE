import React from "react";
import { Image, ImageProps, ImageSourcePropType } from "react-native";
import { ICON, IMAGE } from "../../constants/image";

type IconSource =
  | { source: ImageSourcePropType; name?: undefined; type?: undefined }
  | { name: keyof typeof ICON; source?: undefined; type?: "icon" }
  | { name: keyof typeof IMAGE; source?: undefined; type: "image" };

type IconProps = ImageProps & IconSource & { size?: number };

const Icon: React.FC<IconProps> = (props) => {
  const { source, name, style, size = 24, type, ...rest } = props;
  const src = source ?? (type === "image" ? IMAGE[name] : ICON[name]);
  return (
    <Image
      source={src}
      style={[{ height: size, width: size }, style]}
      {...rest}
    />
  );
};

export default Icon;
