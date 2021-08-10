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
  const isFocused = useIsFocused;
  let currentDate = moment().format("YYYY-MM-DD");
  const list = useSelector((state) => state.getTodo.list);

  const [items, setItems] = useState({});

  useEffect(() => {
    if (isFocused) {
      setItems({});
      loadItems();
    }
  }, [list]);

  const loadItems = () => {
    try {
      const newListData = [...list];
      const currentDateList = newListData.filter(
        (data) => data.createdDate == currentDate
      );
      const lastDateList = newListData.filter(
        (data) => data.createdDate != currentDate
      );
      newListData.forEach((data) => {
        const strTime = data.createdDate;
        // if (!items[strTime]) {
        if (strTime == currentDate) {
          items[strTime] = [];
          currentDateList.forEach((datalist) => {
            items[strTime].push({
              name: datalist.title,
            });
          });
        } else if (strTime != currentDate) {
          items[strTime] = [];
          lastDateList.forEach((datalist) => {
            items[strTime].push({
              name: datalist.title,
            });
          });
        }
        // }
      });

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });

      setItems(newItems);
    } catch (e) {
      console.log("err", e);
    }
  };

  const renderItem = (item) => {
    return (
      <View style={styles.renderItemView}>
        <View style={[styles.taskView]}>
          <Text style={styles.taskText}>{item.name}</Text>
        </View>
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
          loadItemsForMonth={loadItems}
          renderItem={renderItem}
          minDate="2021-07-01"
          maxDate="2023-12-31"
          pastScrollRange={1}
          futureScrollRange={3}
          theme={{
            agendaTodayColor: "black",
            agendaKnobColor: "grey",
            selectedDayBackgroundColor: "orange",
          }}
        />
        <TouchableOpacity>
          <Text style={{ margin: 8, textAlign: "right", marginBottom: 20 }}>
            Date: {currentDate}
          </Text>
        </TouchableOpacity>
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
    margin: 5,
    marginRight: 10,
  },
  taskView: {
    backgroundColor: "#d0dbd0",
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  taskText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    margin: 3,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export { CalendarScreen };
