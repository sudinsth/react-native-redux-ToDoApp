import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

import { colors } from '../constants/color';

export default ({
    placeholder,
    errorMessage, 
    inputStyle, 
    text, 
    onChangeText,
    ...inputProps
}) => {
    return(
        <View style={{flex: 1, marginVertical: 30}}>
            <View style={{backgroundColor: 'yellow'}}>
                <Text style={{color: colors.red}}>
                    {errorMessage && `*${errorMessage}`}
                </Text>
            </View>
                <TextInput 
                    placeholder={placeholder}
                    style={[styles.input, inputStyle]}
                    value={text}
                    onChangeText={onChangeText}
                    {...inputProps}
                />
        </View>
    );
}

const styles=StyleSheet.create({
    input: {
        height: 40,
        fontSize: 16,
        color: '#333',
        padding: 10,
        marginVertical: 12,
        borderColor: 'grey',
        borderBottomWidth: 1
    },
});