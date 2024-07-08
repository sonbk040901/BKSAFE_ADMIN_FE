import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

interface AuthWrapperProps extends PropsWithChildren {}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View
        style={{
          justifyContent: "center",
          height: "100%",
        }}
      >
        {children}
      </View>
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
