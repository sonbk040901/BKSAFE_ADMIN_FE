import React, { PropsWithChildren, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import AuthWrapper from "../../components/AuthWrapper";
import CccdTab from "../../components/register/CccdTab";
import InfoTab from "../../components/register/InfoTab";
import LicenseTab from "../../components/register/LicenseTab";
import { useAppDispatch, useAppSelector } from "../../states";
import { patchRegister, selectRegister } from "../../states/slice/register";
import { showAlert } from "../../utils/alert";
import { AuthNavigationProp } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
const renderScene = SceneMap({
  info: InfoTab,
  cccd: CccdTab,
  license: LicenseTab,
});

const Register = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const phoneRef = useRef<PropsWithChildren<TextInput>>(null);
  const { tab, error, status, phone } = useAppSelector(selectRegister);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "success") return navigation.navigate("Active", { phone });
  }, [navigation, phone, status]);
  useEffect(() => {
    if (!error) return;
    showAlert("Đăng ký thất bại", error);
  }, [error]);
  useEffect(() => {
    const sto = setTimeout(() => {
      phoneRef.current?.focus();
    }, 500);
    return () => {
      clearTimeout(sto);
    };
  }, []);
  return (
    <AuthWrapper>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          Đăng ký tài khoản
        </Text>
        <View style={{ height: 700, width: "100%" }}>
          <TabView
            navigationState={{
              index: tab,
              routes: [
                { key: "info", title: "Thông tin" },
                { key: "cccd", title: "CCCD" },
                { key: "license", title: "Bằng lái" },
              ],
            }}
            renderScene={renderScene}
            onIndexChange={(i) => dispatch(patchRegister({ tab: i }))}
            renderTabBar={() => null}
          />
        </View>
      </View>
    </AuthWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
