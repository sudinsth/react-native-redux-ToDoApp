import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect, useDispatch } from "react-redux";
import { addItem } from "../redux/actions";
import { colors } from "../constants/color";

const AddTodo = () => {
  const [text, setText] = useState();
  const dispatch = useDispatch();

  const addToDo = (text) => {
    if (text != null) {
      dispatch(addItem(text));
    }
    setText(null);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Add ToDo"
          style={styles.textInput}
          defaultValue={text}
          onChangeText={(val) => setText(val)}
        />
      </View>
      <TouchableOpacity onPress={() => addToDo(text)}>
        <View style={styles.addIcon}>
          <Ionicons name="md-add" size={40} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default connect()(AddTodo);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    elevation: 10,
    flexDirection: "row",
    borderRadius: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.orange,
    padding: 10,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderRadius: 5,
  },
  addIcon: {
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.orange,
  },
});
