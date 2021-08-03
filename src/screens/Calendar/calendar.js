import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Agenda } from "react-native-calendars";

import moment from "moment";
import { useSelector } from "react-redux";

import { Header } from "../../component/header";

const CalendarScreen = () => {
  const isFocused = useIsFocused();
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
    if (isFocused) {
      const mappedData = list.map((post) => {
        const date = moment().format("YYYY-MM-DD");

        return {
          ...post,
          date,
        };
      });

      const reduced = mappedData.reduce((acc, currenItem) => {
        const { date, ...jestItem } = currenItem;

        acc[date] = [jestItem];

        return acc;
      }, {});

      // console.log(reduced);
      setItems(reduced);
    }
  }, [isFocused]);
  const renderItem = (item) => {
    return (
      <View style={styles.renderItemView}>
        {list.map((item, id) => (
          <View style={styles.taskView} key={id}>
            <Text style={styles.taskText}>{item.title}</Text>
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
  renderItemView: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
  },
  taskView: {
    backgroundColor: "#d0dbd0",
    marginVertical: 2,
  },
  taskText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    margin: 3,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export { CalendarScreen };
