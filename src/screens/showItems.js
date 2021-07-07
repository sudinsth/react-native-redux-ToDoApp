import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import { useSelector } from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import {Header} from '../component/header'
import {colors} from '../constants/color';

import { ShowCompleted } from '../containers/showCompleted';
import { ShowNotCompleted } from '../containers/showNotCompleted';

const ShowCompletedScreen = ({navigation}) => {
    const list = useSelector((state) => state.getTodo.list);
    let trueCount = 0;
    list.forEach((object) => {
        object.finished === true ? trueCount++ : null; 
    })
    return(
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
                    <ShowCompleted />
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.addIcon}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                        <Ionicons name='md-add' size={30} style={{color: colors.orange}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const ShowNotCompletedScreen = ({navigation}) => {

    return(
        <View style={styles.container}>
        <StatusBar style='auto' />
        <Header navigation={navigation} />
        <View 
                style={{
                    borderWidth: 1,
                    marginTop: 5,
                    borderColor: '#d9dbda', 
                }}
            />
            <View style={styles.content}>
                <View style={{flex: 1}}>
                    <ShowNotCompleted />
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.addIcon}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                        <Ionicons name='md-add' size={30} style={{color: colors.orange}}/>
                    </TouchableOpacity>
                </View>
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
        padding: 10,
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

export {ShowCompletedScreen, ShowNotCompletedScreen};