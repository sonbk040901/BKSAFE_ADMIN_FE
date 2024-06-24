import React, { FC } from "react";
import { Text, View } from "react-native";
import { COLOR } from "../constants/color";
import { DrawerItem } from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";
import { mappingRouteName } from "../utils/route";
import { AppNavigationParamList } from "../types/navigation";

interface CustomDrawerItemProps {
  name: keyof AppNavigationParamList;
  onPress: () => void;
  focused: boolean;
  icon: string;
}

const CustomDrawerItem: FC<CustomDrawerItemProps> = ({
  name,
  onPress,
  focused,
  icon,
}) => {
  return (
    <DrawerItem
      label={({ color }) => {
        const rColor = focused ? COLOR.primary : color;
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <Icon
              name={icon}
              color={rColor}
              type="feather"
            />
            <Text
              style={{
                color: rColor,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {mappingRouteName(name, true)}
            </Text>
          </View>
        );
      }}
      style={{
        backgroundColor: focused ? COLOR.primaryBackground : "transparent",
      }}
      onPress={onPress}
    />
  );
};

export default CustomDrawerItem;
