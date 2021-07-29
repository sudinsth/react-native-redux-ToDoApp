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

import { toggleItem, removeItem, importantItem } from "../redux/actions";
import { RadioButton } from "../component/radioButton";
import { colors } from "../constants/color";
import { PlaceholderScreen } from "../component/placeholderScreen";
import { ShowNotCompleted } from "./showNotCompleted";
import { ShowCompleted } from "./showCompleted";

import { onSnapshot } from "../services/collection";
import { auth, firestore } from "firebase";

const ShowList = ({ navigation }) => {
  const [clicked, setClicked] = useState(0);
  const [firebaseList, setFirebaseList] = useState([]);
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

  const pressHandler = (item, id) => {
    setClicked(id);
  };

  let firestoreRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists");

  useEffect(() => {
    try {
      onSnapshot(firestoreRef, (newLists) => {
        setFirebaseList(newLists);
      });
    } catch (err) {
      console.log("Not found");
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
        firebaseList.length == 0 ? (
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
                {firebaseList.length} Total Tasks
              </Text>
            </View>
            {/* Tasks Lists */}

            {firebaseList.map((item, id) => (
              <View
                key={id}
                style={[
                  styles.listContent,
                  {
                    backgroundColor: item.finished ? colors.grey : colors.white,
                  },
                ]}
              >
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
                          ? colors.white_greyed
                          : colors.black,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.59,
                    alignItems: "flex-end",
                    flexDirection: "row",
                    margin: 4,
                  }}
                >
                  {/* Important Button */}
                  <TouchableOpacity
                    style={{ marginRight: 8 }}
                    onPress={() => (!item.finished ? importantTodo(id) : null)}
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
                    onPress={() => (!item.finished ? removeTodo(id) : null)}
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
});

export default ShowList;
