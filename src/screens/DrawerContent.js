import React from 'react';
import {
    StyleSheet, 
    View,
} from 'react-native';
import {
    Drawer,
    Text,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MaterialCommunityIcons, FontAwesome5, Octicons } from '@expo/vector-icons';

import {auth} from "firebase";

export const DrawerContent = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon ={({color, size}) => (
                                <FontAwesome5 
                                name="tasks"
                                color={color}
                                size={size}
                                />
                            )}
                            label="All Tasks"
                            onPress={() => {props.navigation.navigate('All Tasks')}}
                        />
                        <DrawerItem 
                            icon ={({color, size}) => (
                                <Octicons 
                                name="tasklist"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Completed"
                            onPress={() => {props.navigation.navigate('Completed')}}
                        />
                        <DrawerItem 
                            icon ={({color, size}) => (
                                <MaterialCommunityIcons
                                name="alert-box-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Not Completed"
                            onPress={() => {props.navigation.navigate('Not Completed')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon ={({color, size}) => (
                        < MaterialCommunityIcons
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Log Out"
                    onPress={() => {
                        auth().signOut();
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 28,
    },
    bottomDrawerSection: {
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    drawerContent: {
        flex: 1,
    },
    drawerSection: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'grey',
    }
});