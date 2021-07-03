import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ScrollView, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {connect, useSelector, useDispatch} from 'react-redux';
import { removeItem } from '../redux/actions';
import { colors } from '../constants/color';

const TodoList = () => {
    const list = useSelector((state) => state.getTodo.list)
    const dispatch = useDispatch();
    const removeTodo = (index) => {
        dispatch(removeItem(index))
    }
    return(
        <ScrollView>
            {
            list.map((item, id) =>
                item.finished ? <View key={id} style={styles.list}>
                <Text>{id + 1 }</Text>
                <View style={{flex: 1, borderBottomColor: colors.grey, borderBottomWidth: 1}}>
                    <Text style={styles.item}>{item.title}</Text>
                </View>
                <TouchableOpacity onPress={()=> removeTodo(id)}>
                    <MaterialIcons name="delete" size={24} color="orange" style={styles.icon}/>
                </TouchableOpacity>
            </View>
            : null
                
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        margin: 10,
        fontSize: 18,
        textAlignVertical: 'center',
        alignItems: 'center'
    },
    list: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginHorizontal: 20,
    }
});

export default connect()(TodoList);