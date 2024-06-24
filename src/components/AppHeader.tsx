import { DrawerHeaderProps } from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../constants/color";
import { mappingRouteName } from "../utils/route";
import { AppNavigationParamList, AppNavigationProp } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
interface AppHeaderProps extends DrawerHeaderProps {
  navigation: AppNavigationProp;
  route: RouteProp<AppNavigationParamList>;
}

const AppHeader: FC<AppHeaderProps> = ({ navigation, route }) => {
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
            navigation.toggleDrawer();
          }}
        >
          <Icon
            name="bell"
            type="feather"
            size={25}
            color="white"
          />
        </TouchableOpacity>
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
