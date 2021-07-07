import React, {useState} from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {connect, useSelector, useDispatch} from 'react-redux';
import { addItem, editItem } from '../redux/actions';
import { colors } from '../constants/color';

const EditTodo = ({chosenId, chosenTask}) => {
    const list = useSelector((state) => state.getTodo.list);
    const [edited, setEdited] = useState();
    const dispatch = useDispatch();

    const modifyTodo = (text, index) => {
        if(text!= null){
            const modify = dispatch(editItem(text, index))
            // dispatch(addItem(text));
            console.log(modify);
            // USE REF TO CHANGE MODAL CLOSING
        }
    }

    return (
        <>
        <View style={{
            backgroundColor: colors.white,
            padding: 10,
            elevation: 10,
            flexDirection: 'row',
        }}>
            <View style={{flex: 1}}>
                <TextInput 
                    placeholder= {chosenTask}
                    style={{
                        borderWidth: 1, 
                        borderColor: colors.orange, 
                        padding: 10, 
                        fontSize: 16,
                        fontFamily: 'Poppins-Regular',
                    }}
                    defaultValue={chosenTask}
                    onChangeText={(val) => setEdited(val)}
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
                onPress={() => modifyTodo(edited, chosenId)}
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