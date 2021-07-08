import React from 'react';
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
                    activeTintColor: colors.orange,
                    inactiveTintColor: 'grey',
                    style:{
                        backgroundColor: colors.white,
                        position: 'relative',
                        bottom: 10,
                        height: 60,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        borderTopWidth: 1,
                        borderTopColor: colors.orange_greyed,
                        elevation: 3,
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
                        tabBarLabel: 'Tasks',
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