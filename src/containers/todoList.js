import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoList = ({ todo, removeTodo }) => {

    return(
        <View>
            {todo.map(todo =>
                <TouchableOpacity key={todo.id}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                    <MaterialIcons name="delete" size={24} color="black" onPress={()=> removeTodo(todo.id)} style={styles.icon}/>
                    <Text style={styles.item}>{todo.text}</Text>
                </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        margin: 10,
        fontSize: 16,
        textAlignVertical: 'center',
        alignItems: 'center'
    },
});

export default TodoList;