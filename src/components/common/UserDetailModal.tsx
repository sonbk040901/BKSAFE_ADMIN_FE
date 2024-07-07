import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Dialog, Text } from "@rneui/themed";
import React, { type FC } from "react";
import { Linking, View } from "react-native";
import { COLOR } from "../../constants/color";
import { useAppDispatch, useAppSelector } from "../../states";
import { patchUserId, selectUser } from "../../states/slice/user";
import { RootNavigationProp } from "../../types/navigation";

interface UserDetailModalProps {}

const UserDetailModal: FC<UserDetailModalProps> = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const dispatch = useAppDispatch();
  const { info } = useAppSelector(selectUser);
  const { fullName, avatar, phone } = info || {};
  const isVisible = !!info;
  const handleClose = () => {
    dispatch(patchUserId());
  };
  const handleNavigateChat = () => {
    dispatch(patchUserId());
    if (!info) return;
    navigation.push("DetailChat", { userId: info?.id });
  };
  return (
    <Dialog
      isVisible={isVisible}
      statusBarTranslucent
      onRequestClose={handleClose}
      onBackdropPress={handleClose}
      animationType="fade"
    >
      <View
        style={{
          backgroundColor: COLOR.primay100,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: 5,
          }}
        >
          <Avatar
            size={120}
            rounded
            source={
              avatar
                ? {
                    uri: avatar,
                  }
                : require("../../assets/images/avatar.png")
            }
          />
          <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
            {fullName}
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: COLOR.secondaryBackground,
            paddingVertical: 5,
            flexDirection: "row",
          }}
        >
          <Button
            type="clear"
            title="Gọi"
            icon={{
              name: "phone",
              color: "white",
            }}
            titleStyle={{ color: "white" }}
            containerStyle={{ flex: 1 }}
            onPress={() => {
              Linking.openURL(`tel:${phone}`);
            }}
          />
          <Button
            type="clear"
            title="Nhắn tin"
            icon={{
              name: "message",
              color: "white",
            }}
            titleStyle={{ color: "white" }}
            containerStyle={{ flex: 1 }}
            onPress={handleNavigateChat}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default UserDetailModal;
