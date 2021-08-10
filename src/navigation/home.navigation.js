import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import React from "react";
import { HomeScreen } from "../screens/main.screen";
import { EditScreen } from "../screens/Edit.screen";
import { colors } from "../constants/color";

enableScreens();
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={({ route }) => {
          return {
            title: 'Edit "${route.params.currentTask}"',
            headerTitleStyle: {
              fontSize: 22,
            },
            headerTintColor: colors.orange,
          };
        }}
      />
    </Stack.Navigator>
  );
};
