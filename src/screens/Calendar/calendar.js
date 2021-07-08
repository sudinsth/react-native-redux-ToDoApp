import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
} from 'react-native';
import {
    Calendar,
    CalendarList,
    Agenda
} from 'react-native-calendars';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const CalendarScreen = () => {
    const [items, setItems] = useState({});

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i< 85; i++) {
                const time = day.timestamp + i * 24 *60 * 60 *1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random()*3+1);
                    for (let j =0; j<numItems; j++) {
                        items[strTime].push({
                            name: 'Item for' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random()*150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Agenda 
                    items={items}
                    loadItemsForMonth={loadItems}
                    selected={'2021-07-08'}
                />
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        marginTop: StatusBar.currentHeight,     
    },
    content: {
        flex: 1,
    }
});

export {CalendarScreen};