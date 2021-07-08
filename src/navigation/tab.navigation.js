import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons'

import { AppNavigation } from './drawer.navigation';
import { CalendarScreen } from '../screens/Calendar/calendar';
import { colors } from '../constants/color';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: colors.orange,
                    inactiveTintColor: colors.grey,
                    style: {
                        backgroundColor: colors.white,
                        height: 80,
                    },
                }}
            >
                <Tab.Screen 
                    name="Task" 
                    component={AppNavigation}
                    options={{
                        tarBarIcon: ({focused}) => (
                            <View>
                                <FontAwesome5 
                                    name="tasks"
                                    color={colors.orange}
                                    size={size}
                                    style={{
                                        height: 25,
                                        width: 25,
                                        tintColor: focused ? colors.orange : colors.white,
                                    }}
                                />
                            </View>
                        ),
                    }}    
                />
                <Tab.Screen 
                    name="Calendar" 
                    component={CalendarScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

export {TabNavigation};