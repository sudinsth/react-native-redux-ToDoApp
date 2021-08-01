import React from "react";
import { View, StyleSheet } from "react-native";

import EditTodo from "../containers/editTodo";
import { ReminderTab } from "../component/reminder";

export const EditScreen = ({ route, navigation }) => {
  const itemId = route.params.currentId;
  const chosenTask = route.params.currentTask;

  return (
    <View style={styles.container}>
      <EditTodo
        navigation={navigation}
        editTaskId={itemId}
        editTaskText={chosenTask}
      />
      <View style={styles.reminderTab}>
        <ReminderTab notify={chosenTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
  },
  reminderTab: {
    backgroundColor: "#d5cfd6",
    flex: 1,
    padding: 10,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 5,
  },
});
