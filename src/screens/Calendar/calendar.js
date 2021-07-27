import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";

import moment from "moment";
import { useSelector } from "react-redux";

import { Header } from "../../component/header";

const CalendarScreen = () => {
  let currentDate = moment().format("YYYY-MM-DD");
  const list = useSelector((state) => state.getTodo.list);

  const array = [];
  const listObj = {};
  list.forEach((object) => {
    listObj.title = object.id;
    array.push(listObj);
  });

  const [items, setItems] = useState({});

  useEffect(() => {
    const mappedData = list.map((post) => {
      const date = moment().format("YYYY-MM-DD");

      return {
        ...post,
        date,
      };
    });

    const reduced = mappedData.reduce((acc, currenItem) => {
      const { createdAt, ...jestItem } = currenItem;

      acc[createdAt] = [jestItem];

      return acc;
    }, {});

    console.log(reduced);
    setItems(reduced);
  }, []);
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
          selected={currentDate}
          renderItem={renderItem}
          minDate="2021-07-01"
          maxDate="2022-12-31"
          pastScrollRange={1}
          futureScrollRange={1}
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

        <Text style={{ margin: 8, textAlign: "right", marginBottom: 20 }}>
          Date: {currentDate}
        </Text>
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
