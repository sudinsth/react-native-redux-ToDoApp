import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {Header} from './component/header';
import AddTodo from './containers/addTodo';
import VisibleTodo from './containers/VisibleTodo';
const ToDoApp = () => {
    return (
        <View style={styles.container}>
        <StatusBar style='auto' />
            <Header />
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
      marginTop: 40,
    },
  });