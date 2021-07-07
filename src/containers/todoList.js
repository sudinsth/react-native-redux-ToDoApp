import React, {useState} from 'react';
import {
    StyleSheet, 
    TouchableOpacity, 
    Button, 
    ScrollView, 
    View,
    Text
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {connect, useSelector, useDispatch} from 'react-redux';
import { removeItem } from '../redux/actions';
import { colors } from '../constants/color';
import { PlaceholderScreen } from '../component/placeholderScreen';
import { TextInput } from 'react-native-gesture-handler';

const TodoList = () => {
    const list = useSelector((state) => state.getTodo.list)
    const dispatch = useDispatch();
    const removeTodo = (index) => {
        dispatch(removeItem(index))
    }
    return(
        <View>
            {   list.length == 0
            ?   <PlaceholderScreen /> 

    :    <ScrollView>
            <View style={{
                margin: 15, 
                elevation: 5, 
                backgroundColor: colors.white,
                paddingHorizontal: 6,
                alignSelf: 'center'
            }}>
                <Text style={{
                    textAlign: 'center', 
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                }}>
                    {list.length} Tasks Added
                </Text>
            </View>
            <View style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: colors.orange_greyed,
                width: '100%',
                top: 25,
            }}
            />
            {
            list.map((item, id) =>
                !item.finished ? <View key={id} style={styles.list}>
                <Text style={{fontFamily: 'Poppins-Regular'}}>{id + 1 }</Text>
                <View style={{flex: 1, borderBottomColor: colors.grey, borderBottomWidth: 1}}>
                    <Text style={styles.item}>{item.title}</Text>
                </View>
                <TouchableOpacity onPress={()=> removeTodo(id)}>
                    <MaterialIcons name="delete" size={24} color={colors.orange} style={styles.icon}/>
                </TouchableOpacity>
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
        padding: 10,
        margin: 10,
        fontSize: 18,
        textAlignVertical: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-Regular'
    },
    list: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginHorizontal: 20,
    }
});

export default connect()(TodoList);