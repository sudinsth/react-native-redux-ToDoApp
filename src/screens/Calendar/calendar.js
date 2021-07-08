import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <Text> From Calendar Screen.</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Dimensions.get('window').height - 500,     
    }
});

export {CalendarScreen};