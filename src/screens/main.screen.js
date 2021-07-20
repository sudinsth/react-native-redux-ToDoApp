import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Pressable,
  StatusBar as BarStatus,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../component/header";
import { colors } from "../constants/color";

import ShowList from "../containers/showList";
import AddTodo from "../containers/addTodo";

export const HomeScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header navigation={navigation} />
      <View
        // Boder Line
        style={{
          borderWidth: 1,
          marginTop: 5,
          borderColor: "#d9dbda",
        }}
      />
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <ShowList navigation={navigation} />
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable onPress={() => setModalOpen(true)}>
          <View style={styles.addIcon}>
            <Ionicons
              name="md-add"
              size={30}
              style={{ color: colors.orange }}
            />
          </View>
        </Pressable>
      </View>

      <Modal visible={modalOpen} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
          onPress={() => setModalOpen(false)}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: "#fff",
                paddingTop: 20,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.orange,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    margin: 10,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Add a Task
                </Text>
              </View>
              <AddTodo />
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  margin: 10,
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderRadius: 5,
                  borderColor: colors.orange,
                  elevation: 15,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
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
    marginTop: 10,
  },
  footer: {
    flex: 0.17,
  },
  addIcon: {
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.orange,
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 0.86,
  },
});
