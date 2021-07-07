import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, ScrollView} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';

import { toggleItem, removeItem } from '../redux/actions';
import {RadioButton} from '../component/radioButton';
import {colors} from '../constants/color';
import {PlaceholderScreen} from '../component/placeholderScreen';


const ShowNotCompleted = () => {

    const list = useSelector((state) => state.getTodo.list)
    const dispatch = useDispatch();
    const toggleTodo = (index) => {
        dispatch(toggleItem(index))
    }
    const removeTodo = (index) => {
        dispatch(removeItem(index))
    }

    let falseCount = 0;
    list.forEach((object) => {
        object.finished === false ? falseCount++ : null;
    });

    return(
        <View> 
            {falseCount == 0 
            ?   <PlaceholderScreen />

            : <ScrollView>
                <View>
                    <Text style={{textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Regular'}}>
                        {falseCount} Tasks Left
                    </Text>
                </View>
            {
                list.map((item, id) =>
                !item.finished ?
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
                : null
            )}
            </ScrollView>
            }
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
        elevation: 3,
        backgroundColor: colors.white
    }
});

export {ShowNotCompleted};