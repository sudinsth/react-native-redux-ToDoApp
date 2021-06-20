import React from 'react';
import {View} from 'react-native';

import VisibleTodo from '../containers/VisibleTodo';
import ShowList from '../containers/showList';

const ShowItem = () => {

    return(
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
            <ShowList />
        </View>
    );
};

export default ShowItem;