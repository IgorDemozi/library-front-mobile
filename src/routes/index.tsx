import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../pages/home";
import Login from "../pages/login";

const StackNavigator = createNativeStackNavigator();

export default function Routes() {
  return (
    <StackNavigator.Navigator screenOptions={{ headerBackVisible: false }}>
      <StackNavigator.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <StackNavigator.Screen
        name="Home"
        component={Home}
        options={{ title: "Início" }}
      />
    </StackNavigator.Navigator>
  );
}
