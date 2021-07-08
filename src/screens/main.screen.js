import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Pressable,
    StatusBar as BarStatus
} from 'react-native';

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
                // Boder Line
                style={{
                    borderWidth: 1,
                    marginTop: 5,
                    borderColor: '#d9dbda', 
                }}
            />
            <View style={styles.content}>
                <View style={{flex: 1}}>
                    <ShowList navigation={navigation}/>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable onPressIn={() => navigation.navigate('AddItem')}>
                    <View style={styles.addIcon}>
                            <Ionicons name='md-add' size={30} style={{color: colors.orange}}/>
                    </View>
                </Pressable>

            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.white,
        marginTop: BarStatus.currentHeight,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    footer: {
        flex: 0.17,
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
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.86
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