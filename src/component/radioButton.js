import React from 'react';
import { View } from 'react-native';
import {colors} from '../constants/color';

export const RadioButton = (props) => {
    return (
        <View style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: colors.orange,
            alignItems: 'center',
            justifyContent: 'center',
        }, props.style]}>
            {
                props.selected ?
                <View style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: colors.orange_greyed,
                }}
                />
                : null
            }
        </View>
    )
}