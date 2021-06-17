import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoList = ({ todo, toggleTodo, removeTodo }) => {

    return(
        <View>
            <FlatList 
                data={todo}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={()=>toggleTodo(item.id)}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                            <MaterialIcons name="delete" size={24} color="black" onPress={()=> removeTodo(item.id)} style={styles.icon}/>
                            <Text style={{textDecorationLine: item.completed? 'line-through': 'none',...styles.item}}>{item.text}</Text>
                        </View>
                        </TouchableOpacity>
                        
                    )
                }}
                keyExtractor={item => item.id.toString()}
            />
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