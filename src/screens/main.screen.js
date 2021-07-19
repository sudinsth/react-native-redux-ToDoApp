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
              <AddTodo />
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                style={{
                  backgroundColor: "#fff",
                  padding: 15,
                  marginVertical: 10,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: colors.orange,
                  elevation: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
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
    // backgroundColor: colors.white,
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
  // addItem: {
  //     borderWidth: 1,
  //     borderColor: colors.orange,
  //     padding: 20,
  //     marginHorizontal: 20,
  //     marginTop: 15,
  //     color: 'black',
  //     textAlign: 'center',
  // }
});
