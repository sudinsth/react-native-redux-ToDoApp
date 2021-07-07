import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import EditTodo from '../containers/editTodo';

const EditScreen = ({route, taskId, chosenList}) => {

    // const itemId = route.params.currentId
    // const chosenTask = route.params.currentTask
    const itemId = taskId
    const chosenTask = chosenList

    return (
        <View style={styles.container}>
            <EditTodo chosenId={itemId} chosenTask={chosenTask}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    }
});

export {EditScreen};