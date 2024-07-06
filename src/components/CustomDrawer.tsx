import { DrawerNavigationState } from "@react-navigation/native";
import { Avatar, Button, Icon } from "@rneui/themed";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { authApi } from "../api";
import { COLOR } from "../constants/color";
import { useInitAppContext } from "../hook/useInitApp";
import { useAppDispatch, useAppSelector } from "../states";
import { getProfile, selectProfile } from "../states/slice/profile";
import { AppNavigationParamList, AppNavigationProp } from "../types/navigation";
import { mappingRouteName } from "../utils/route";
import CustomDrawerItem from "./CustomDrawerItem";
const drawerItems: {
  name: string;
  icon: string;
  route: string;
}[] = [
  { name: "Home", icon: "home", route: "Home" },
  { name: "History", icon: "file-text", route: "History" },
  { name: "Profile", icon: "user", route: "Profile" },
  { name: "Setting", icon: "settings", route: "Setting" },
];
type Props = {
  navigation: AppNavigationProp;
  state: DrawerNavigationState<AppNavigationParamList>;
};
const CustomDrawer = ({ navigation, state }: Props) => {
  const { refetch } = useInitAppContext();
  const { avatar, fullName, phone } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await authApi.logout();
    refetch();
  };
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <View style={styles.userItem}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Icon
            name="close"
            type="ionicon"
            size={35}
            color="white"
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Avatar
            size={50}
            source={
              avatar ? { uri: avatar } : require("../assets/images/avatar.png")
            }
            containerStyle={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.email}>{phone}</Text>
          </View>
        </View>
      </View>
      <View style={styles.drawerItem}>
        {state.routes.map((route, index) => {
          const focused = index === state.index;
          return (
            <CustomDrawerItem
              key={route.key}
              focused={focused}
              {...drawerItems[index]}
              name={mappingRouteName(route.name, true)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
      <View style={styles.drawerFooter}>
        <Button
          radius="md"
          buttonStyle={{
            backgroundColor: COLOR.errorBackground,
            paddingHorizontal: 20,
          }}
          titleStyle={{ color: COLOR.error, fontWeight: "bold" }}
          onPress={handleLogout}
        >
          Đăng xuất
        </Button>
        <Text style={{ fontSize: 10 }}>
          <Text style={{ fontWeight: "bold" }}>BKSafe</Text> &copy;2024 by{" "}
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            Lê Đức Sơn
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeIcon: { alignSelf: "flex-end" },
  userItem: {
    height: 120,
    padding: 10,
    backgroundColor: COLOR.primary,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  avatar: {
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  drawerItem: {
    flex: 1,
  },
  drawerFooter: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 5,
  },
  info: {},
  fullName: { fontWeight: "bold", fontSize: 20, color: "white" },
  email: { fontWeight: "500", fontSize: 15, color: "white" },
});
