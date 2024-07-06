import { useNavigation } from "@react-navigation/native";
import { Avatar, Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR } from "../../constants/color";
import { STYLE } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  getProfile,
  patchProfile,
  selectProfile,
} from "../../states/slice/profile";
import Card from "../Card";
import Item from "./Item";

const DetailInfo = () => {
  const { fullName, email, phone, status, avatar } =
    useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getProfile());
    });
    return unsubscribe;
  }, [dispatch, navigation]);
  return (
    <Card style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Avatar
          size={200}
          rounded
          source={
            avatar ? { uri: avatar } : require("../../assets/images/avatar.png")
          }
          containerStyle={STYLE.shadow}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: -5,
            right: 5,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLOR.secondaryBackground,
            borderRadius: 50,
            paddingHorizontal: 7,
            paddingVertical: 3,
            gap: 2,
          }}
          onPress={async () => {
            const res = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              base64: true,
              quality: 0.5,
            });
            const uri = res.assets?.[0].uri;
            if (!uri) return;
            dispatch(
              patchProfile({
                avatar: uri,
                avatarSource: res.assets?.[0],
              }),
            );
          }}
        >
          <Icon
            size={25}
            name="edit"
            color={COLOR.white}
          />
          <Text style={{ color: COLOR.white, fontWeight: "bold" }}>
            Chọn ảnh
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        refreshing={status === "loading"}
        onRefresh={() => dispatch(getProfile())}
        data={[
          { name: "user", content: fullName, key: "fullName" },
          { name: "mail", content: email, key: "email" },
          { name: "phone", content: phone, key: "phone", editable: false },
          // { name: "map-pin", content: "Hà Nội" },
          // { name: "calendar", content: "01/01/2001" },
        ]}
        renderItem={({ item }) => (
          <Item
            {...item}
            onChange={(value) => {
              dispatch(patchProfile({ [item.key]: value }));
            }}
          />
        )}
      />
    </Card>
  );
};

export default DetailInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
