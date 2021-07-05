import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import {Ionicons} from '@expo/vector-icons';

import {Header} from '../component/header';
import { colors } from '../constants/color';

import ShowList from '../containers/showList';

export const HomeScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
        <StatusBar style='auto' />
        <Header navigation={navigation}/>
        <View 
                style={{
                    borderWidth: 1,
                    marginTop: 5,
                    borderColor: '#d9dbda', 
                }}
            />
            <View style={styles.content}>
                <View style={{flex: 1}}>
                    <ShowList />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                    <View style={styles.addIcon}>
                            <Ionicons name='md-add' size={30} style={{color: colors.orange}}/>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.white,
        marginTop: 28,
    },
    content: {
        flex: 6,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    footer: {
        flex: 1,
    },
    addIcon: {
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.orange,
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: colors.white,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {width: 30, height: 30},
        shadowOpacity: 30
    },
    // addItem: {
    //     borderWidth: 1,
    //     borderColor: colors.orange,
    //     padding: 20,
    //     marginHorizontal: 20,
    //     marginTop: 15,
    //     color: 'black',
    //     textAlign: 'center',
    // }
  });