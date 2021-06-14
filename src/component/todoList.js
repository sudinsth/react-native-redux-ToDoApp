import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import todo from '../redux/reducers/todo';

const TodoList = ({ todo, toggleTodo }) => {
    return(
        <View>
            {todo.map(todo =>
                <TouchableOpacity key={todo.id} onPress={()=>toggleTodo(todo.id)}>
        
                    <Text style={{textDecorationLine: todo.completed? 'line-through': 'none', ...styles.item}}>{todo.text}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 14,
        margin: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        fontSize: 16,
    }
});

export default TodoList;