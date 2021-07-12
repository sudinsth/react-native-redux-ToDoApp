import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import moment from "moment";
import { useSelector } from "react-redux";

import { Header } from "../../component/header";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

const CalendarScreen = () => {
  let currentDate = moment().format();

  const list = useSelector((state) => state.getTodo.list);

  const array = [];
  const listObj = {};
  list.forEach((object) => {
    listObj.title = object.id;
    array.push(listObj);
  });

  const [items, setItems] = useState({
    "2021-07-12": [{ name: "test1", completed: "true" }],
  });

  // const loadItems = (day) => {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: "Item for" + strTime + " #" + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 10);
  // };

  const renderItem = (item) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          margin: 5,
          borderRadius: 15,
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {list.map((item, id) => (
          <View
            style={{
              backgroundColor: "#d0dbd0",
              marginVertical: 2,
            }}
            key={id}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Regular",
                margin: 3,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header showHeader={"false"} />
      <View style={styles.content}>
        <Agenda
          items={items}
          // loadItemsForMonth={loadItems}
          selected={currentDate}
          renderItem={renderItem}
          maxDate="2022-12-31"
          pastScrollRange={2}
          futureScrollRange={2}
          minDate={new Date()}
          theme={{
            // agendaDayTextColor: "yellow",
            // agendaDayNumColor: "green",
            agendaTodayColor: "black",
            agendaKnobColor: "grey",
            selectedDayBackgroundColor: "orange",
          }}
          style={{
            backgroundColor: "orange",
            color: "red",
          }}
        />
        <Text style={{ margin: 8, textAlign: "right" }}>
          Date: {currentDate}
        </Text>
        {/* <TouchableOpacity
          onPress={() => {
            console.log(list);
          }}
        >
          <Text>Console</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  content: {
    flex: 1,
  },
});

export { CalendarScreen };
