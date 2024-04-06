import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { COLOR } from "../constants/color";

const AppWrapper = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: COLOR.primary,
          height: 80,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,
          elevation: 11,
        }}
      />
      <View
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
  },
});
