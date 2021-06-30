import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {connect, useSelector, useDispatch} from 'react-redux';
import { toggleItem } from '../redux/actions';

import {RadioButton} from '../component/radioButton';

const ShowList = () => {
    const list = useSelector((state) => state.getTodo.list)
    const dispatch = useDispatch();
    const toggleTodo = (index) => {
        dispatch(toggleItem(index))
    }
    return(
        <View>
            {list.map((item, id) =>
                    <View key={id} style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
                        <TouchableOpacity onPress={() => toggleTodo(id)}>
                            <RadioButton selected={item.finished}/>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                            <Text style={styles.item}>{item.title}</Text>
                        </View>
                    </View>
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

export default connect()(ShowList);