import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  StatusBar as BarStatus,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../component/header";
import { colors } from "../constants/color";

import ShowList from "../containers/showList";
import AddTodo from "../containers/addTodo";
import { CustModal } from "../component/modal";

export const HomeScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalPressHandler = (action) => {
    setModalOpen(action);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header navigation={navigation} />
      <View style={styles.borderLine} />
      <View style={styles.content}>
        <ShowList navigation={navigation} />
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.addIcon}
          onPress={() => modalPressHandler(true)}
        >
          <Ionicons name="md-add" size={30} color={colors.orange} />
        </Pressable>
      </View>

      <CustModal
        pressHandler={modalPressHandler}
        visible={modalOpen}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.addTaskButton}>
          <Text style={styles.addTaskText}>Add a Task</Text>
        </View>
        <AddTodo />
        <TouchableOpacity
          onPress={() => modalPressHandler(false)}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </CustModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: BarStatus.currentHeight,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  footer: {
    flex: 0.16,
  },
  borderLine: {
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#d9dbda",
  },
  addIcon: {
    borderWidth: 3,
    borderColor: colors.orange,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 0.86,
  },
  addTaskButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
    marginBottom: 20,
  },
  addTaskText: {
    fontSize: 20,
    margin: 10,
    fontFamily: "Poppins-Regular",
  },
  cancelButton: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    marginVertical: 20,
    borderBottomWidth: 1,
    borderRadius: 5,
    borderColor: colors.orange,
    elevation: 10,
  },
  cancelText: {
    fontSize: 16,
    textAlign: "center",
  },
});
