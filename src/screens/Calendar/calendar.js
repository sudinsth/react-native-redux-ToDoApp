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

  const [items, setItems] = useState({});

  let jsondata;
  const loadItems = () => {
    console.log("From list", list);
    // if (isFocused) {
    list.forEach((data) => {
      const strTime = data.createdDate;
      if (!items[strTime]) {
        items[strTime] = [];
        list.forEach((datalist) => {
          items[strTime].push({
            name: datalist.title,
          });
        });
      }
    });

    const newItems = {};
    Object.keys(items).forEach((key) => {
      // console.log("key]", key);
      newItems[key] = items[key];
    });
    jsondata = JSON.parse(JSON.stringify(newItems));

    console.log("json", jsondata);
    console.log("newItems", newItems);
    // setItems(newItems);
    setItems(jsondata);
    // }
  };

  useEffect(() => {
    if (items == null) {
      loadItems();
    }
  }, [items]);

  const reloadAgenda = () => {
    setItems("");
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
          maxDate="2022-12-31"
          pastScrollRange={1}
          futureScrollRange={1}
          theme={{
            agendaTodayColor: "black",
            agendaKnobColor: "grey",
            selectedDayBackgroundColor: "orange",
          }}
        />
        <TouchableOpacity onPress={reloadAgenda}>
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
