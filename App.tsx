import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { THEME } from "./src/constants/theme";
import { InitAppProvider } from "./src/hook/useInitApp";
import AppNavigator from "./src/navigators/AppNavigator";
import AuthNavigator from "./src/navigators/AuthNavigator";
import Splash from "./src/screens/Splash";
import { store } from "./src/states";
import { RootNavigationParamList } from "./src/types/navigation";

const Stack = createStackNavigator<RootNavigationParamList>();
const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={THEME}>
        <NavigationContainer>
          <InitAppProvider>
            <Provider store={store}>
              <StatusBar style="light" />
              <Stack.Navigator
                screenOptions={{ headerShown: false, animationEnabled: true }}
              >
                <Stack.Screen
                  name="Splash"
                  component={Splash}
                />
                <Stack.Screen
                  name="App"
                  component={AppNavigator}
                />
                <Stack.Screen
                  name="Auth"
                  component={AuthNavigator}
                />
              </Stack.Navigator>
            </Provider>
          </InitAppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
