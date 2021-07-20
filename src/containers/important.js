import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacityBase,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { toggleItem, removeItem, importantItem } from "../redux/actions";
import { RadioButton } from "../component/radioButton";
import { colors } from "../constants/color";
import { PlaceholderScreen } from "../component/placeholderScreen";

const ImportantTodo = () => {
  const list = useSelector((state) => state.getTodo.list);
  const dispatch = useDispatch();
  const toggleTodo = (index) => {
    dispatch(toggleItem(index));
  };
  const importantTodo = (index) => {
    dispatch(importantItem(index));
  };
  const removeTodo = (index) => {
    dispatch(removeItem(index));
  };

  let importantCount = 0;
  list.forEach((object) => {
    object.important ? importantCount++ : null;
  });

  return (
    <View>
      {importantCount == 0 ? (
        <PlaceholderScreen />
      ) : (
        <ScrollView>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Poppins-Regular",
              }}
            >
              {importantCount} Important Tasks
            </Text>
          </View>
          {list.map((item, id) =>
            item.important ? (
              <View key={id} style={styles.listContent}>
                <TouchableOpacity onPress={() => toggleTodo(id)}>
                  <RadioButton selected={item.finished} />
                </TouchableOpacity>
                <View style={{ flex: 2 }}>
                  <View style={{ alignItems: "flex-start", marginLeft: 15 }}>
                    <Text
                      style={{
                        ...styles.item,
                        textDecorationLine: item.finished
                          ? "line-through"
                          : "none",
                        color: item.finished
                          ? colors.orange_greyed
                          : colors.black,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.36,
                    alignItems: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  {/* Important Button */}
                  <TouchableOpacity
                    style={{ marginRight: 8 }}
                    onPress={() => importantTodo(id)}
                  >
                    <AntDesign
                      name={item.important ? "star" : "staro"}
                      size={24}
                      color={colors.orange}
                    />
                  </TouchableOpacity>
                  {/* Important Button */}
                  <TouchableOpacity onPress={() => removeTodo(id)}>
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
    borderRadius: 5,
    borderBottomColor: colors.orange,
    borderBottomWidth: 1,
    elevation: 3,
    backgroundColor: colors.white,
  },
});

export { ImportantTodo };
