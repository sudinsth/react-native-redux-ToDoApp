import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../component/header";
import { colors } from "../constants/color";
import { ImportantTodo } from "../containers/important";

export const ImportantTaskScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View
        style={{
          borderWidth: 1,
          marginTop: 5,
          borderColor: "#d9dbda",
        }}
      />
      <View style={styles.content}>
        <ImportantTodo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.orange_greyed,
  },
  content: {
    flex: 1,
    padding: 10,
    // justifyContent: "center",
  },
});
