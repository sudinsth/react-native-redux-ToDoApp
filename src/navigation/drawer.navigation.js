import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeStack } from "./home.navigation";
import { DrawerContent } from "../screens/DrawerContent";
import { ShowCompletedScreen } from "../screens/showItems";
import { ShowNotCompletedScreen } from "../screens/showItems";

const Drawer = createDrawerNavigator();

export const AppNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="All Tasks" component={HomeStack} />
      <Drawer.Screen name="Completed" component={ShowCompletedScreen} />
      <Drawer.Screen name="Not Completed" component={ShowNotCompletedScreen} />
    </Drawer.Navigator>
  );
};
