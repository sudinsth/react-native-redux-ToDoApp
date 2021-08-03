import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

import {
  toggleItem,
  removeItem,
  importantItem,
  updateTodo,
} from "../redux/actions";
import { RadioButton } from "../component/radioButton";
import { colors } from "../constants/color";
import { PlaceholderScreen } from "../component/placeholderScreen";
import { ShowNotCompleted } from "./showNotCompleted";
import { ShowCompleted } from "./showCompleted";

import { onSnapshot } from "../services/collection";
import { auth, firestore } from "firebase";

const ShowList = ({ navigation }) => {
  const [clicked, setClicked] = useState(0);
  // const firebaseList = useSelector((state) => state.getTodo.list);
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

  const pressHandler = (item, id) => {
    setClicked(id);
  };

  let firestoreRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists");

  useEffect(() => {
    try {
      onSnapshot(
        firestoreRef,
        (newLists) => {
          // console.log("newlist", newLists);

          dispatch(updateTodo(newLists));
        },
        {
          sort: (a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          },
        }
      );
    } catch (err) {
      console.log("Not found", err);
    }
  }, []);

  const buttons = ["All", "Completed", "Remaining"];

  return (
    <View style={{ flex: 1 }}>
      {/* Button Start */}
      <View style={styles.groupButton}>
        {buttons.map((buttonLabel, index) => {
          return (
            <TouchableOpacity
              onPress={(item) => pressHandler(item, index)}
              key={index}
              style={[index === clicked ? styles.buttonActive : styles.button]}
            >
              <Text
                style={
                  index === clicked ? styles.textActive : styles.textInactive
                }
              >
                {buttonLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* BUtton ENd */}
      {clicked === 0 ? (
        list.length == 0 ? (
          <PlaceholderScreen />
        ) : (
          <ScrollView>
            <View>
              <Text style={styles.labelText}>{list.length} Total Tasks</Text>
            </View>
            {/* Tasks Lists */}

            {list.map((item, id) => (
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
                      color={
                        item.finished ? colors.orange_greyed : colors.orange
                      }
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
                      color={
                        item.finished ? colors.orange_greyed : colors.orange
                      }
                    />
                  </TouchableOpacity>
                  {/* Remove Button */}
                  <TouchableOpacity
                    onPress={() =>
                      !item.finished ? removeTodo(item.identify, item.id) : null
                    }
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={
                        item.finished ? colors.orange_greyed : colors.orange
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )
      ) : clicked === 1 ? (
        <ShowCompleted />
      ) : (
        <ShowNotCompleted />
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
    // borderWidth: 1,
    // borderColor: colors.orange,
    borderBottomColor: colors.orange,
    borderBottomWidth: 1,
    elevation: 3,
    backgroundColor: colors.white,
  },
  groupButton: {
    padding: 10,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderTopLeftRadius: 10,
    padding: 10,
    elevation: 5,
  },
  buttonActive: {
    flex: 1,
    height: 40,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderTopLeftRadius: 10,
    padding: 10,
    elevation: 5,
  },
  textActive: {
    color: "white",
    fontSize: 18,
  },
  textInactive: {
    color: "black",
    fontSize: 16,
  },
  labelText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
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
});

export default ShowList;
