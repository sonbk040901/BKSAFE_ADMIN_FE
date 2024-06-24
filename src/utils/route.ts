import { AppNavigationParamList } from "../types/navigation";
const routeName: Record<keyof AppNavigationParamList, string> = {
  Home: "BKSafe",
  Setting: "Cài đặt",
  History: "Lịch sử chuyến đi",
  Profile: "Thông tin cá nhân",
};
const routeNameDrawer: Record<keyof AppNavigationParamList, string> = {
  Home: "Trang chủ",
  Setting: "Cài đặt",
  History: "Lịch sử chuyến đi",
  Profile: "Thông tin cá nhân",
};
export const mappingRouteName = (
  name: keyof AppNavigationParamList,
  isDrawerItem = false,
) => {
  return isDrawerItem ? routeNameDrawer[name] : routeName[name];
};
