import { useNavigation } from "@react-navigation/native";
import { Avatar, Dialog, Icon } from "@rneui/themed";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
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
  const { fullName, email, phone, status, avatar, address, birthday } =
    useAppSelector(selectProfile);
  // console.log(fullName, email, phone, status, avatar, address, birthday);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
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
          { name: "map-pin", content: address, key: "address" },
          {
            name: "calendar",
            content: dayjs(birthday).format("DD/MM/YYYY"),
            key: "birthday",
            editable: false,
            onPress: () => setShowDatePicker(true),
          },
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
      <Dialog
        isVisible={showDatePicker}
        statusBarTranslucent
        onRequestClose={() => setShowDatePicker(false)}
        onDismiss={() => setShowDatePicker(false)}
      >
        <DateTimePicker
          mode="date"
          value={dayjs(birthday).toDate()}
          onValueChange={(date) => {
            if (!date) return;
            dispatch(
              patchProfile({
                birthday: dayjs(date).toDate().toISOString(),
              }),
            );
            setShowDatePicker(false);
          }}
        />
      </Dialog>
    </Card>
  );
};

export default DetailInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
