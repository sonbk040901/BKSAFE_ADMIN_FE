import { Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IMAGE } from "../constants/image";

interface AuthWrapperProps extends PropsWithChildren {}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <StatusBar />
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            source={IMAGE.cropLogo}
            style={{
              width: 200,
              height: 140,
              objectFit: "contain",
              backgroundColor: "transparent",
            }}
          />
        </View>
        {children}
      </ScrollView>
    </View>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 20,
  },
});
