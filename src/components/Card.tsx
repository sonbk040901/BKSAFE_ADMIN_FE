import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  radius?: number;
  shadow?: boolean;
}

const Card = ({ children, style, radius = 20, shadow = true }: CardProps) => {
  return (
    <View
      needsOffscreenAlphaCompositing
      style={[
        styles.container,
        shadow && styles.shadow,
        style,
        { borderRadius: radius },
      ]}
    >
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 330,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 15,
    zIndex: 100,
  },
  shadow: {
    shadowColor: "#575757",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    elevation: 5,
  },
});
