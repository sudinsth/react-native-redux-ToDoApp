import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from './constants/color';
import AddTodo from './containers/addTodo';
import TodoList from './containers/todoList';
const ToDoApp = () => {
    return (
        <View style={styles.container}>
        <StatusBar style='auto' />
            <AddTodo />
            <View style={styles.todolist}>
                <TodoList />
            </View>
        </View>
        
    );
};

export default ToDoApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 20,
    },
    todolist: {
        flex: 1,
        backgroundColor: colors.white,
    }
});