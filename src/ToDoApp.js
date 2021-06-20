import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import AddTodo from './containers/addTodo';
import VisibleTodo from './containers/VisibleTodo';
const ToDoApp = () => {
    return (
        <View style={styles.container}>
        <StatusBar style='auto' />
            <AddTodo />
            <View>
                <VisibleTodo />
            </View>
        </View>
        
    );
};

export default ToDoApp;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      paddingTop: 20,
    },
  });