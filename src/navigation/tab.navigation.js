import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons, Feather, Ionicons, FontAwesome5} from '@expo/vector-icons';


import { AppNavigation } from './drawer.navigation';
import { CalendarScreen } from '../screens/Calendar/calendar';
import { colors } from '../constants/color';
import { color } from 'react-native-reanimated';

import { TaskIcon } from '../constants/tabIcons';
import {HomeScreen} from '../screens/main.screen';



const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Task"
                // activeColor= {colors.white}
                tabBarOptions={{
                    activeTintColor: colors.white,
                    inactiveTintColor: colors.grey,
                    style:{
                        backgroundColor: colors.white_greyed,
                        // position: 'relative',
                        // bottom: 10,
                        height: 60,
                        marginHorizontal: 1,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderTopWidth: 1,
                        shadowColor: colors.black,
                        shadowOpacity: 0.86,
                        shadowOffset: {
                            width: 10,
                            height: 10,
                        }
                    },
                    // iconStyle: {
                    //     width: 30,
                    //     marginTop: 20,
                    //     marginBottom: 10,
                    // },
                    labelStyle: {
                        fontSize: 13,
                        marginBottom: 10,
                        fontFamily: 'Poppins-Regular'
                    }
                }}
            >
                <Tab.Screen 
                    name="Task" 
                    component={AppNavigation}
                    options={{
                        tabBarLabel: 'All Tasks',
                        tarBarIcon: ({focused}) => {
                            <View >
                                <TaskIcon />
                            </View>
                        }    
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