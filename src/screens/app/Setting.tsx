import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppWrapper from "../../components/AppWrapper";
import { AppNavigationProp } from "../../types/navigation";
import { Button } from "@rneui/themed";
import { authApi } from "../../api";
import { useInitAppContext } from "../../hook/useInitApp";

interface SettingProps {
  navigation: AppNavigationProp;
}

const Setting = ({ navigation }: SettingProps) => {
  const { refetch } = useInitAppContext();
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text></Text>
        <Button
          onPress={async () => {
            await authApi.logout();
            refetch();
            navigation.replace("Auth");
          }}
        >
          Đăng xuất
        </Button>
      </View>
    </AppWrapper>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
