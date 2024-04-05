import { createTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";
export const THEME = createTheme({
  lightColors: {
    primary: "#1F87FE",
    secondary: "#6E7E91",
    success: "#00C48C",
    warning: "#FF8A00",
    error: "#FF3D71",
    black: "#2D3142",
    white: "#FFFFFF",
  },
  darkColors: {
    primary: "#1F87FE",
    secondary: "#6E7E91",
    success: "#00C48C",
    warning: "#FF8A00",
    error: "#FF3D71",
    black: "#2D3142",
    white: "#FFFFFF",
  },
  mode: "light",
  components: {
    Button: { radius: "md" },
    Icon: {
      color: "#1F87FE",
    },
  },
});
export const style = StyleSheet.create({
  shadow: {
    shadowColor: "#575757",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    elevation: 5,
  },
});
