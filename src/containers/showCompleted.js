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

const ShowCompleted = () => {
  const list = useSelector((state) => state.getTodo.list);
  const dispatch = useDispatch();
  const toggleTodo = (value, index) => {
    dispatch(toggleItem(value, index));
  };
  const removeTodo = (value, index) => {
    dispatch(removeItem(value, index));
  };

  let trueCount = 0;
  list.forEach((object) => {
    object.finished ? trueCount++ : null;
  });

  return (
    <View>
      {trueCount == 0 ? (
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
              {trueCount} Tasks Completed
            </Text>
          </View>
          {list.map((item, id) =>
            item.finished ? (
              <View
                key={id}
                style={[
                  styles.listContent,
                  {
                    backgroundColor: item.finished ? colors.grey : colors.white,
                  },
                ]}
              >
                <TouchableOpacity onPress={() => toggleTodo(item.identify, id)}>
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
                          ? colors.white_greyed
                          : colors.black,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() => removeTodo(item.identify, id)}
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={colors.orange}
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
    borderRadius: 5,
    borderBottomColor: colors.orange,
    borderBottomWidth: 1,
  },
});

export { ShowCompleted };
