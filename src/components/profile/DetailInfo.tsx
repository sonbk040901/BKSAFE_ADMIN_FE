import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Card from "../Card";
import Item from "./Item";
import { useAppDispatch, useAppSelector } from "../../states";
import { getProfile, selectProfile } from "../../states/slice/profile";
import { useNavigation } from "@react-navigation/native";
// import { RectButton } from "react-native-gesture-handler";
// import { Button } from "@rneui/themed";

const DetailInfo = () => {
  const { fullName, email, phone } = useAppSelector(selectProfile);
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
      <Item
        name="user"
        content={fullName}
      />
      <Item
        name="mail"
        content={email}
      />
      <Item
        name="phone"
        content={phone}
      />
      <Item
        name="map-pin"
        content="Hà Nội"
      />
      <Item
        name="calendar"
        content="01/01/2001"
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
