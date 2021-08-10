import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { colors } from "../constants/color";
import { RadioButton } from "./radioButton";
import { useDispatch } from "react-redux";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

import { PlaceholderScreen } from "../component/placeholderScreen";

import { toggleItem, removeItem, importantItem } from "../redux/actions";
import { ScrollView } from "react-native-gesture-handler";

export const ListView = ({ list, filter, navigation }) => {
  const dispatch = useDispatch();
  const toggleTodo = (value, index) => {
    dispatch(toggleItem(value, index));
  };
  const importantTodo = (value, index) => {
    dispatch(importantItem(value, index));
  };
  const removeTodo = (value, index) => {
    dispatch(removeItem(value, index));
  };

  let filteredList = list;
  if (filter == "important") {
    filteredList = list.filter((item) => item.important === true);
  } else if (filter !== "all") {
    filteredList = list.filter((item) => item.finished === filter);
  }

  let totalTaskIndicator = "";
  const emptyscreen = () => {
    if (filteredList == 0) {
      return <PlaceholderScreen />;
    } else {
      if (filter == true) {
        totalTaskIndicator = " Completed";
      } else if (filter == false) {
        totalTaskIndicator = " Remaining";
      } else if (filter == "important") {
        totalTaskIndicator = " Important Tasks";
      } else {
        totalTaskIndicator = " Total Tasks";
      }
      return (
        <Text style={styles.labelText}>
          {filteredList.length + totalTaskIndicator}
        </Text>
      );
    }
  };

  return (
    <View>
      {emptyscreen()}
      <ScrollView>
        {filteredList.map((item, id) => (
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
              <View style={styles.taskView}>
                <Text
                  style={{
                    ...styles.item,
                    textDecorationLine: item.finished ? "line-through" : "none",
                    color: item.finished ? colors.white_greyed : colors.black,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
            <View style={styles.icons}>
              {/* Important Button */}
              <TouchableOpacity
                style={{ marginRight: 8 }}
                onPress={() =>
                  !item.finished ? importantTodo(item.identify, id) : null
                }
              >
                <AntDesign
                  name={item.important ? "star" : "staro"}
                  size={24}
                  color={item.finished ? colors.orange_greyed : colors.orange}
                />
              </TouchableOpacity>
              {/* Important Button */}

              {/* Edit Button */}
              <TouchableOpacity
                onPress={() =>
                  !item.finished
                    ? navigation.navigate("EditScreen", {
                        currentTask: item.title,
                        currentId: item.id,
                        identify: item.identify,
                      })
                    : null
                }
                style={{ marginRight: 8 }}
              >
                <Feather
                  name="edit"
                  size={24}
                  color={item.finished ? colors.orange_greyed : colors.orange}
                />
              </TouchableOpacity>
              {/* Remove Button */}
              <TouchableOpacity onPress={() => removeTodo(item.identify, id)}>
                <MaterialIcons
                  name="delete"
                  size={24}
                  color={item.finished ? colors.orange_greyed : colors.orange}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  icons: {
    flex: 0.59,
    alignItems: "flex-end",
    flexDirection: "row",
    margin: 4,
  },
  taskView: {
    alignItems: "flex-start",
    marginLeft: 15,
  },
  labelText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginVertical: 5,
  },
});
