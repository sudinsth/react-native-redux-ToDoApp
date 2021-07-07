import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import {colors} from '../constants/color';


export const Header = ({navigation}) => {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={30} onPress={openMenu} style={styles.icon}/>

            <View style={{flex: 1, justifyContent: 'center',}}>
                <Text style={styles.title}>
                    ToDo
                <Text style={{color: colors.orange, fontFamily: 'Poppins-Regular'}}>App</Text>
                </Text>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        backgroundColor: colors.white,
        elevation: 5,
        flexDirection: 'row',
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginRight: 35,
        fontFamily: 'Poppins-Regular'
    },
    icon: {
        marginLeft: 15,
    }
});