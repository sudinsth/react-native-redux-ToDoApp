import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {connect} from 'react-redux';
import { toggleTodo } from '../redux/actions';

const mapStateToProps = state => ({
    todo: state.todo
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id=> dispatch(toggleTodo(id)),
})
const ShowList = ({todo, toggleTodo}) => {
    return(
        <View>
            {todo.map(todo =>
                <TouchableOpacity key={todo.id} onPress={()=>toggleTodo(todo.id)}>
                    <Text style={{textDecorationLine: todo.completed? 'line-through':'none' ,...styles.item}}>{todo.text}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        margin: 10,
        fontSize: 20,
        textAlignVertical: 'center',
        alignItems: 'center',
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(ShowList);