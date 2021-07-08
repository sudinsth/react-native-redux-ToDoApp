import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const TaskIcon = () => {
    return (
        <View>
            <FontAwesome5 
                name="tasks"
                size={50}
                color='black'
            />
        </View>
    );
}

export {TaskIcon};