import React, {useState, useRef, useEffect} from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {connect, useDispatch} from 'react-redux';
import { editItem } from '../redux/actions';
import { colors } from '../constants/color';

const EditTodo = ({editTaskId, editTaskText, navigation}) => {
    const [edited, setEdited] = useState();
    const focusRef = useRef(null);
    const dispatch = useDispatch();

    const modifyTodo = (text, index) => {
        if(text!= null){
            dispatch(editItem(text, index))
        }
        navigation.goBack();
    }

    return (
        <>
        <View style={{
            backgroundColor: colors.white,
            padding: 10,
            elevation: 10,
            flexDirection: 'row',
            marginTop: 20,
            marginHorizontal: 10,
        }}>
            <View style={{flex: 1}}>
                <TextInput
                    placeholder= {editTaskText}
                    style={{
                        borderWidth: 1, 
                        borderColor: colors.orange, 
                        padding: 10, 
                        fontSize: 16,
                        fontFamily: 'Poppins-Regular',
                    }}
                    defaultValue={editTaskText}
                    onChangeText={(val) => setEdited(val)}
                    autoFocus={true}
                />
            </View>
        </View>
        <View style={{
            alignSelf: 'center'
        }}>
            <TouchableOpacity 
                style={{
                    backgroundColor: colors.orange, 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    elevation: 10,
                    marginTop: 20,
                }} 
                onPress={() => modifyTodo(edited, editTaskId)}
            >
                <Text style={{
                    fontSize: 18,
                    color: colors.white,
                    margin: 10
                }}>Done</Text>
                <View style={{height: 50, justifyContent: 'center'}}>
                    <Feather name="edit" size={25} color={colors.white} style={{marginRight: 7}}/>
                </View>
            </TouchableOpacity>
        </View>
            
        </>
    );
}

export default connect()(EditTodo);