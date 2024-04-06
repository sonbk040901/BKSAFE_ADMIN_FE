import { Image } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/image";
import { useInitAppContext } from "../hook/useInitApp";
import type { RootNavigationProp } from "../types/navigation";
interface SplashProps {
  navigation: RootNavigationProp;
}
const Splash = ({ navigation }: SplashProps) => {
  const { isLoading, isAuthenticated, data } = useInitAppContext();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated && data) {
      navigation.replace("App", { userInfo: data });
      return;
    }
    navigation.replace("Auth");
  }, [navigation, isLoading, isAuthenticated, data]);
  return (
    <LinearGradient
      colors={["#8abfff", "#ffffff", "#ffffff", "#429aff"]}
      style={styles.container}
    >
      <Image
        source={IMAGE.logo}
        style={{
          width: "100%",
          height: 250,
        }}
        resizeMode="contain"
      />
      <ActivityIndicator
        size="large"
        color={COLOR.primary}
        style={styles.indicator}
      />
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary,
    flex: 1,
    justifyContent: "center",
  },
  indicator: {
    marginVertical: 10,
  },
});
