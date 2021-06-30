import React, {useState} from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect, useDispatch} from 'react-redux';
import { addItem } from '../redux/actions';

const AddTodo = () => {
    
    const [text, setText] = useState();
    const dispatch = useDispatch();

    const addToDo = (text) => {
        dispatch(addItem(text))
        setText(null)
    }

    return (
        <View>
            <TextInput 
                placeholder='Add ToDo'
                style={{borderWidth: 1, borderColor: 'orange', padding: 10}}
                defaultValue={text}
                onChangeText={(val) => setText(val)}
            />
            <TouchableOpacity onPress={() => addToDo(text)}>
                <View style={{height: 50, alignItems: 'center'}}>
                    <Ionicons name='md-add' size={30} style={{color: 'orange', padding: 10}}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default connect()(AddTodo);