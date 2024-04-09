import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Avatar, Button, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLOR } from "../constants/color";
import CustomDrawerItem from "./CustomDrawerItem";
import { authApi } from "../api";
import { AppNavigationProp } from "../types/navigation";
import { useInitAppContext } from "../hook/useInitApp";
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
type Props = DrawerContentComponentProps & { navigation: AppNavigationProp };
const CustomDrawer = ({ navigation, state }: Props) => {
  const { data } = useInitAppContext();
  const handleLogout = () => {
    authApi.logout();
    navigation.replace("Auth");
  };
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
            source={require("../assets/images/avatar.png")}
            avatarStyle={{
              resizeMode: "contain",
              width: 50,
              height: 50,
            }}
            containerStyle={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.fullName}>{data?.fullName}</Text>
            <Text style={styles.email}>{data?.email}</Text>
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
