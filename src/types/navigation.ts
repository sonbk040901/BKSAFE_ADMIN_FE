import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
export type RootNavigationParamList = {
  Splash: undefined;
  App: undefined;
  Map: undefined;
  Auth: undefined;
  BookingReceive: undefined;
  CurrentBooking: undefined;
  DetailChat: { userId: number };
  Chat: undefined;
  Notification: undefined;
  HistoryDetail: { bookingId: number };
};
export type RootNavigationProp = StackNavigationProp<RootNavigationParamList>;
export type AppNavigationParamList = {
  Home: undefined;
  Setting: undefined;
  History: undefined;
  Profile: undefined;
};
export type AppNavigationProp = DrawerNavigationProp<AppNavigationParamList> &
  StackNavigationProp<RootNavigationParamList>;
export type AuthNavigationParamList = {
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
  Active: { phone: string };
};
export type AuthNavigationProp = StackNavigationProp<AuthNavigationParamList> &
  StackNavigationProp<RootNavigationParamList>;
export type MapRouteProp = RouteProp<RootNavigationParamList, "Map">;

export type DetailChatRouteProp = RouteProp<
  RootNavigationParamList,
  "DetailChat"
>;
export type DetailHistoryRouteProp = RouteProp<
  RootNavigationParamList,
  "HistoryDetail"
>;
export type ActiveRouteProp = RouteProp<AuthNavigationParamList, "Active">;
