import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { toggleItem, removeItem } from "../redux/actions";
import { RadioButton } from "../component/radioButton";
import { colors } from "../constants/color";
import { PlaceholderScreen } from "../component/placeholderScreen";

const ShowNotCompleted = () => {
  const list = useSelector((state) => state.getTodo.list);
  const dispatch = useDispatch();
  const toggleTodo = (value, index) => {
    dispatch(toggleItem(value, index));
  };
  const removeTodo = (value, index) => {
    dispatch(removeItem(value, index));
  };

  let falseCount = 0;
  list.forEach((object) => {
    object.finished === false ? falseCount++ : null;
  });

  return (
    <View>
      {falseCount == 0 ? (
        <PlaceholderScreen />
      ) : (
        <ScrollView>
          <View>
            <Text style={styles.labelText}>{falseCount} Tasks Left</Text>
          </View>
          {list.map((item, id) =>
            !item.finished ? (
              <View key={id} style={styles.listContent}>
                <TouchableOpacity onPress={() => toggleTodo(item.identify, id)}>
                  <RadioButton selected={item.finished} />
                </TouchableOpacity>
                <View style={{ flex: 2 }}>
                  <View style={styles.taskView}>
                    <Text
                      style={{
                        ...styles.item,
                        textDecorationLine: item.finished
                          ? "line-through"
                          : "none",
                        color: item.finished
                          ? colors.white_greyed
                          : colors.black,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View style={styles.removeButton}>
                  <TouchableOpacity
                    onPress={() => removeTodo(item.identify, id)}
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="orange"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 20,
    textAlignVertical: "center",
    alignItems: "center",
  },
  listContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
    borderRadius: 5,
  },
  labelText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  removeButton: {
    flex: 0.2,
    alignItems: "flex-end",
  },
  taskView: {
    alignItems: "flex-start",
    marginLeft: 15,
  },
});

export { ShowNotCompleted };
