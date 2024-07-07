import { DrawerHeaderProps } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../constants/color";
import { subcribe } from "../socket";
import { AppNavigationParamList, AppNavigationProp } from "../types/navigation";
import { mappingRouteName } from "../utils/route";
import { Chat } from "../api";
interface AppHeaderProps extends DrawerHeaderProps {
  navigation: AppNavigationProp;
  route: RouteProp<AppNavigationParamList>;
}

const AppHeader: FC<AppHeaderProps> = ({ navigation, route }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const unsub1 = subcribe("chat/new-chat", (chat: Chat) => {
      if (chat.isDriver) return;
      setCount((c) => c + 1);
    });
    return () => {
      unsub1();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {mappingRouteName(route.name)}
      </Text>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon
            name="menu"
            type="feather"
            size={35}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => {
            navigation.push("Notification");
          }}
        >
          <Icon
            name="bell"
            type="feather"
            size={25}
            color="white"
          />
        </TouchableOpacity>

        {route.name === "Home" && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 47,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <TouchableOpacity
              style={{ padding: 15 }}
              onPress={() => {
                navigation.push("Chat");
                setCount(0);
              }}
            >
              <Icon
                name="chatbubble-ellipses-outline"
                type="ionicon"
                size={25}
                color="white"
              />
              {count > 0 && (
                <View
                  style={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    backgroundColor: "red",
                    borderRadius: 10,
                    width: 17,
                    height: 17,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: COLOR.primary,
    // flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
