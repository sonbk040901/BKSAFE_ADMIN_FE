import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthWrapperProps extends PropsWithChildren {}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
