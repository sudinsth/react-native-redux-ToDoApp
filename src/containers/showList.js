import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { updateTodo } from "../redux/actions";

import { PlaceholderScreen } from "../component/placeholderScreen";

import { onSnapshot } from "../services/collection";
import { auth, firestore } from "firebase";

import { ListView } from "../component/listView";

const ShowList = ({ navigation }) => {
  const [clicked, setClicked] = useState(0);
  const list = useSelector((state) => state.getTodo.list);
  const dispatch = useDispatch();

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

  let filter;
  if (clicked === 0) {
    filter = "all";
  } else if (clicked === 1) {
    filter = true;
  } else {
    filter = false;
  }

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
      <ScrollView>
        <View>
          {/* Tasks Lists */}
          <ListView list={list} navigation={navigation} filter={filter} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
