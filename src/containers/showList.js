import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {connect} from 'react-redux';

const mapStateToProps = state => ({
    todo: state.todo
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id=> dispatch(toggleTodo(id)),
})
const ShowList = ({todo}) => {
    return(
        <View>
            {todo.map(todo =>
                <TouchableOpacity key={todo.id} onPress={()=>toggleTodo(todo.id)}>
                <View key={todo.id} style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                    <Text style={styles.item}>{todo.text}</Text>
                </View>
                // </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        margin: 10,
        fontSize: 16,
        textAlignVertical: 'center',
        alignItems: 'center'
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(ShowList);