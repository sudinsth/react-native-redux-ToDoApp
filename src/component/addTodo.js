import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';

export const AddTodo = ({submitHandler}) => {
    const [text, setText] = useState();

    const changeHandler = (val) =>{
        setText(val);
    }

    return (
        <View>
            <TextInput 
                placeholder='Add Todo'
                onChangeText={changeHandler}
                style={styles.input}
                value={text}
            />
            <Button onPress={() => submitHandler(text)} title="Add" color='#eb8f26'/>
        </View>
    )
}

const styles=StyleSheet.create({
    input: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#eb8f26',
    }
})