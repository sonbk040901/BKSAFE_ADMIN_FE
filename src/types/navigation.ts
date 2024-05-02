import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Account } from "../api";
export type RootNavigationParamList = {
  Splash: undefined;
  App: {
    userInfo: Account;
  };
  Map: undefined;
  Auth: undefined;
  BookingReceive: undefined;
  CurrentBooking: undefined;
};
export type RootNavigationProp = StackNavigationProp<RootNavigationParamList>;
export type AppNavigationParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};
export type AppNavigationProp = DrawerNavigationProp<AppNavigationParamList> &
  StackNavigationProp<RootNavigationParamList>;
export type AuthNavigationParamList = {
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
};
export type AuthNavigationProp = StackNavigationProp<AuthNavigationParamList> &
  StackNavigationProp<RootNavigationParamList>;
export type MapRouteProp = RouteProp<RootNavigationParamList, "Map">;
