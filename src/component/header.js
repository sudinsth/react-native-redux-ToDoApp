import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

export const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>ToDo</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        paddingTop: 15,
        backgroundColor: '#fc8c03',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    }
});