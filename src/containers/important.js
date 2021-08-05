import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
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
  const toggleTodo = (value, index) => {
    dispatch(toggleItem(value, index));
  };
  const importantTodo = (value, index) => {
    dispatch(importantItem(value, index));
  };
  const removeTodo = (value, index) => {
    dispatch(removeItem(value, index));
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
            <Text style={styles.labelText}>
              {importantCount} Important Tasks
            </Text>
          </View>
          {list.map((item, id) =>
            item.important ? (
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
                          ? colors.orange_greyed
                          : colors.black,
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
                    onPress={() => importantTodo(item.identify, id)}
                  >
                    <AntDesign
                      name={item.important ? "star" : "staro"}
                      size={24}
                      color={
                        item.finished ? colors.orange_greyed : colors.orange
                      }
                    />
                  </TouchableOpacity>
                  {/* Important Button */}
                  <TouchableOpacity
                    onPress={() => removeTodo(item.identify, item.id)}
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={
                        item.finished ? colors.orange_greyed : colors.orange
                      }
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
  labelText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  icons: {
    flex: 0.36,
    alignItems: "flex-end",
    flexDirection: "row",
  },
});

export { ImportantTodo };
