import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

import { AppNavigation } from "./drawer.navigation";
import { CalendarScreen } from "../screens/Calendar/calendar";
import { colors } from "../constants/color";

import { HomeScreen } from "../screens/main.screen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Task"
        // activeColor= {colors.white}
        tabBarOptions={{
          activeTintColor: colors.orange,
          inactiveTintColor: colors.grey,
          style: {
            backgroundColor: colors.white_greyed,
            position: "relative",
            bottom: 10,
            height: 70,
            padding: 10,
            // marginHorizontal: 10,
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            borderTopWidth: 1,
            shadowColor: colors.black,
            shadowOpacity: 0.86,
            shadowOffset: {
              width: 10,
              height: 10,
            },
          },
          iconStyle: {
            width: 25,
            height: 25,
          },
          labelStyle: {
            fontSize: 13,
            marginBottom: 5,
            fontFamily: "Poppins-Regular",
          },
        }}
      >
        <Tab.Screen
          name="Task"
          component={AppNavigation}
          options={{
            tabBarLabel: "All Tasks",
            // tabBarIcon: <FontAwesome5 name="tasks" size={25} color="white" />,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome5 name="tasks" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="calendar-alt" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { TabNavigation };
