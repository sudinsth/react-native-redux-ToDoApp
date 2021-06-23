import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoApp from '../ToDoApp';
import { Header } from '../component/header';
import {HomeScreen} from '../screens/main.screen';
import ShowItem from '../screens/showItems';

const Stack = createStackNavigator();

export const AppNavigation = () => {
    return (
       <NavigationContainer>
           <Stack.Navigator>
               <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
               />
               <Stack.Screen 
                name="AddItem"
                component={ToDoApp}
                options={{
                    headerTitle: () => (<Header />),
                    headerStyle: {  
                        height: 110,                  
                    },
                }}
               />
               <Stack.Screen 
                name="ShowItem"
                component={ShowItem}
                options={{
                    headerTitle: () => (<Header />),
                    headerStyle: {  
                        height: 110,                  
                    },
                }}
               />
           </Stack.Navigator>
       </NavigationContainer>
    );
};