import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppNavigation } from "../navigation/drawer.navigation";
import { LoginScreen } from "./login.screen";

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export const AuthScreens = () => {
  return <AppNavigation />;
};
