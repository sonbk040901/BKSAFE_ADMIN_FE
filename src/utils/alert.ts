import { Platform, ToastAndroid, Alert } from "react-native";
export const showNativeAlert = (message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    alert(message);
  }
};
export const showAlert: typeof Alert.alert = (
  title,
  message,
  buttons,
  options,
) => {
  Alert.alert(title, message, buttons, options);
};
