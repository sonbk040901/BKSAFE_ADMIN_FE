import { Avatar } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { COLOR } from "../../constants/color";
import Card from "../Card";
import { useAppSelector } from "../../states";
import { selectProfile } from "../../states/slice/profile";

const CommonInfo = () => {
  const { avatar, fullName, email } = useAppSelector(selectProfile);
  return (
    <Card style={styles.container}>
      <Avatar
        size={50}
        source={avatar ?? require("../../assets/images/avatar.png")}
        avatarStyle={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <RectButton
        style={styles.button}
        rippleColor="#b6b6b64f"
      >
        <Text style={{ color: COLOR.primary, fontWeight: "500" }}>Sửa</Text>
      </RectButton>
    </Card>
  );
};

export default CommonInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  avatar: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  info: { justifyContent: "center", alignItems: "flex-start", flex: 1 },
  name: { fontWeight: "bold", fontSize: 20 },
  email: {
    fontWeight: "500",
    fontSize: 15,
    color: COLOR.secondary2,
    textTransform: "lowercase",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.primaryBackground,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
