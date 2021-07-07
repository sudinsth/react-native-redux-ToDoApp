import React from 'react';

import { View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoApp from '../ToDoApp';
import { Header } from '../component/header';
import {HomeScreen} from '../screens/main.screen';
import { EditScreen } from '../screens/Edit.screen';
import { colors } from '../constants/color';

const Stack = createStackNavigator();

export const HomeStack = ({navigation, currentTask}) => {
    return (
    //    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false
                // headerTitle: () => <Header navigation={navigation}/>,
            }}
            />
            <Stack.Screen 
            name="AddItem"
            component={ToDoApp}
            options={{
                headerTitle: () => <View>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                        }}>
                            ToDo
                        <Text style={{color: 'orange'}}>App</Text>
                        </Text>
                    </View>,
                headerTintColor: 'orange'
            }}
            />
            <Stack.Screen 
                name = "EditScreen"
                component = {EditScreen}
                options={({route}) => {
                    return({
                        title: `Edit "${route.params.currentTask}"`,
                        headerTitleStyle: {
                            fontSize: 22
                        },
                        headerTintColor: colors.orange
                    })
                }}
            />
        </Stack.Navigator>
    //    </NavigationContainer>
    );
};