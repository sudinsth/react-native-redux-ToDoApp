import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { editItem } from "../redux/actions";
import { colors } from "../constants/color";

const EditTodo = ({ editTaskId, editTaskText, dbIdentify, navigation }) => {
  const [edited, setEdited] = useState();
  const dispatch = useDispatch();

  const modifyTodo = (text, index, currentValue) => {
    if (text != null) {
      dispatch(editItem(text, index, currentValue));
    }
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.textEditView}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={editTaskText}
            style={styles.textEditor}
            defaultValue={editTaskText}
            onChangeText={(val) => setEdited(val)}
            autoFocus={true}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => modifyTodo(edited, editTaskId, dbIdentify)}
        >
          <Text style={styles.buttonText}>Done</Text>
          <View style={styles.editIcon}>
            <Feather
              name="edit"
              size={25}
              color={colors.white}
              style={{ marginRight: 7 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  editIcon: {
    height: 50,
    justifyContent: "center",
  },
  textEditView: {
    backgroundColor: colors.white,
    padding: 10,
    elevation: 10,
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  textEditor: {
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  editButton: {
    backgroundColor: colors.orange,
    elevation: 10,
    marginTop: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    margin: 10,
  },
});

export default EditTodo;
