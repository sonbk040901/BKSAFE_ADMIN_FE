import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Home from "../screens/app/Home";
import History from "../screens/app/History";
import AppHeader from "../components/AppHeader";
import CustomDrawer from "../components/CustomDrawer";
import Setting from "../screens/app/Setting";
import Profile from "../screens/app/Profile";
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        swipeEnabled: true,
        swipeEdgeWidth: 90,
        header: (props) => <AppHeader {...props} />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        name="History"
        component={History}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
