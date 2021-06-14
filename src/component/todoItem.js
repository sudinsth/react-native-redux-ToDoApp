import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export const TodoItem = ({ item, pressHandler }) => {
    return(
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text style={styles.item}>{item.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 14,
        margin: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
    }
});