import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR, STYLE } from "../../constants";

interface BadgeProps extends PropsWithChildren {
  bg?: string;
  title?: string;
}

const Badge = (props: BadgeProps) => {
  const { bg, children, title } = props;
  return (
    <View style={[styles.container, STYLE.shadow, { backgroundColor: bg }]}>
      <Text style={{ color: COLOR.secondary2, fontWeight: "500" }}>
        {title || children}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
});
