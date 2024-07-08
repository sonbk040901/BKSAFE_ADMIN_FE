import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Active from "../screens/auth/Active";
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
      <Stack.Screen
        name="Active"
        component={Active}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
