import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import type {
  ActiveRouteProp,
  AuthNavigationProp,
} from "../../types/navigation";
import AuthWrapper from "../../components/AuthWrapper";
import { COLOR } from "../../constants/color";
import { Button, Input } from "@rneui/themed";
import { authApi } from "../../api";
import { showNativeAlert } from "../../utils/alert";

const Active = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const route = useRoute<ActiveRouteProp>();
  const [activationCode, setActivationCode] = useState<string>();
  const [error, setError] = useState<string>();
  const { phone } = route.params;
  const active = async () => {
    if (!activationCode) {
      setError("Vui lòng nhập mã xác nhận");
      return;
    }
    try {
      await authApi.active({ phone, activationCode });
      showNativeAlert("Kích hoạt tài khoản thành công");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 200);
    } catch (error) {
      setError("Mã xác nhận không đúng");
    }
  };
  return (
    <AuthWrapper>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          Nhập mã xác nhận
        </Text>
        <Input
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderColor: COLOR.secondaryBackground,
          }}
          placeholder="Mã xác nhận"
          errorMessage={error}
          onChangeText={(v) => {
            setActivationCode(v);
            setError(undefined);
          }}
          leftIcon={{
            name: "lock",
            type: "font-awesome",
          }}
          leftIconContainerStyle={{
            marginRight: 10,
          }}
        />
        <Button
          titleStyle={{
            fontWeight: "bold",
            fontSize: 20,
            paddingHorizontal: 30,
          }}
          size="lg"
          onPress={active}
        >
          Xác nhận
        </Button>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={{ color: COLOR.secondary, fontSize: 12 }}>
            Mã xác nhận đã được gửi về số điện thoại{" "}
            <Text style={{ fontWeight: "600" }}>{phone}</Text>.
          </Text>
          <Text style={{ color: COLOR.secondary, fontSize: 12 }}>
            Vui lòng nhập mã xác nhận để kích hoạt tài khoản.
          </Text>
        </View>
      </View>
    </AuthWrapper>
  );
};

export default Active;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
