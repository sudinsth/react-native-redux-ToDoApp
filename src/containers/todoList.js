import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {connect, useSelector, useDispatch} from 'react-redux';
import { removeItem } from '../redux/actions';

const TodoList = () => {
    const list = useSelector((state) => state.getTodo.list)
    const dispatch = useDispatch();
    const removeTodo = (index) => {
        dispatch(removeItem(index))
    }
    return(
        <View>
            {
            list.map((item, id) =>
                <View key={id} style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                    <TouchableOpacity onPress={()=> removeTodo(id)}>
                        <MaterialIcons name="delete" size={24} color="orange" style={styles.icon}/>
                    </TouchableOpacity>
                    <Text style={styles.item}>{item.title}</Text>
                </View>
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

export default connect()(TodoList);