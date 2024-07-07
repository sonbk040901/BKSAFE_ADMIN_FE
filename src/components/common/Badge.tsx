import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { COLOR } from "../../constants/color";

interface BadgeProps {
  icon?: React.ReactNode;
  type?:
    | "success"
    | "warning"
    | "danger"
    | "volcano"
    | "purple"
    | "magenta"
    | "cyan"
    | "primary";
  value: string;
  fullFill?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Badge = (props: BadgeProps) => {
  const {
    type = "success",
    value,
    fullFill,
    containerStyle,
    textStyle,
  } = props;
  const style = badgeStyle[type][fullFill ? "fullFill" : "default"];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: style.backgroundColor,
          borderColor: style.color,
          borderWidth: 0.3,
        },
        containerStyle,
      ]}
    >
      <Text
        style={[
          {
            color: style.color,
            fontWeight: "500",
            paddingHorizontal: 4,
            paddingVertical: 1,
            fontSize: 12,
          },
          textStyle,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: COLOR.primaryBackground,
  },
});

const badgeStyle: Record<
  Required<BadgeProps>["type"],
  Record<"default" | "fullFill", { backgroundColor: string; color: string }>
> = {
  success: {
    default: {
      backgroundColor: COLOR.successBackground,
      color: COLOR.success,
    },
    fullFill: {
      backgroundColor: COLOR.success,
      color: COLOR.white,
    },
  },
  warning: {
    default: {
      backgroundColor: COLOR.warningBackground,
      color: COLOR.warning,
    },
    fullFill: {
      backgroundColor: COLOR.warning,
      color: COLOR.white,
    },
  },
  danger: {
    default: {
      backgroundColor: COLOR.errorBackground,
      color: COLOR.error,
    },
    fullFill: {
      backgroundColor: COLOR.error,
      color: COLOR.white,
    },
  },
  volcano: {
    default: {
      backgroundColor: COLOR.volcanoBackground,
      color: COLOR.volcano,
    },
    fullFill: {
      backgroundColor: COLOR.volcano,
      color: COLOR.white,
    },
  },
  purple: {
    default: {
      backgroundColor: COLOR.purpleBackground,
      color: COLOR.purple,
    },
    fullFill: {
      backgroundColor: COLOR.purple,
      color: COLOR.white,
    },
  },
  magenta: {
    default: {
      backgroundColor: COLOR.magentaBackground,
      color: COLOR.magenta,
    },
    fullFill: {
      backgroundColor: COLOR.magenta,
      color: COLOR.white,
    },
  },
  cyan: {
    default: {
      backgroundColor: COLOR.cyanBackground,
      color: COLOR.cyan,
    },
    fullFill: {
      backgroundColor: COLOR.cyan,
      color: COLOR.white,
    },
  },
  primary: {
    default: {
      backgroundColor: COLOR.primaryBackground,
      color: COLOR.primary,
    },
    fullFill: {
      backgroundColor: COLOR.primary,
      color: COLOR.white,
    },
  },
};
