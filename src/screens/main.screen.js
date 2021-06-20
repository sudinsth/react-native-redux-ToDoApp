import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import {Header} from '../component/header';

export const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
        <StatusBar style='auto' />
            <View style={styles.content}>
                <Header />
                <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                    <Text style={styles.addItem}>Add Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ShowItem')}>
                    <Text style={styles.addItem}>Show Tasks</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    addItem: {
        borderWidth: 1,
        borderColor: 'orange',
        padding: 20,
        marginHorizontal: 20,
        marginTop: 15,
        color: 'black',
        textAlign: 'center',
    }
  });