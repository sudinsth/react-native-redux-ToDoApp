import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, ScrollView} from 'react-native';

import {connect, useSelector, useDispatch} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';

import { toggleItem, removeItem } from '../redux/actions';
import {RadioButton} from '../component/radioButton';
import {colors} from '../constants/color';



const ShowList = () => {

    const list = useSelector((state) => state.getTodo.list)
    const dispatch = useDispatch();
    const toggleTodo = (index) => {
        dispatch(toggleItem(index))
    }
    const removeTodo = (index) => {
        dispatch(removeItem(index))
    }

    return(
        <View>
            <View>
                <Text style={{textAlign: 'center', fontSize: 16}}>
                    {list.length} Total Tasks
                </Text>
            </View> 

            <ScrollView>
            {
                list.map((item, id) =>
                <View key={id} style={styles.listContent}>
                    <TouchableOpacity onPress={() => toggleTodo(id)}>
                        <RadioButton selected={item.finished}/>
                    </TouchableOpacity>
                    <View style={{flex: 15}}>
                        <View style={{alignItems: 'flex-start', marginLeft: 15,}}>
                        <Text style={{ 
                            ...styles.item,
                            textDecorationLine: item.finished? 'line-through':'none',
                            color: item.finished? colors.orange_greyed : colors.black,
                            }}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=> removeTodo(id)}>
                            <MaterialIcons name="delete" size={24} color="orange" style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            </ScrollView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 5,
        marginVertical: 10,
        fontSize: 20,
        textAlignVertical: 'center',
        alignItems: 'center',
    },
    listContent: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5,
        paddingHorizontal: 10,
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: colors.orange,
        elevation: 3,
        backgroundColor: colors.white
    }
});

export default connect()(ShowList);