import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { TabNavigation } from "./tab.navigation";
import { DrawerContent } from "../screens/DrawerContent";
import { ImportantTaskScreen } from "../screens/importantTask.screen";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerType={"slide"}
        initialRouteName={"All Tasks"}
      >
        <Drawer.Screen name="All Tasks" component={TabNavigation} />
        <Drawer.Screen name="Important Tasks" component={ImportantTaskScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
