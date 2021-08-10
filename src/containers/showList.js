import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { updateTodo } from "../redux/actions";

import { onSnapshot } from "../services/collection";
import { auth, firestore } from "firebase";

import { ListView } from "../component/listView";
import { CategoryButton } from "../component/listCategoryButton";

const titleBtnNameMap = {
  All: "All",
  Completed: "Completed",
  Remaining: "Remaining",
};

const ShowList = ({ navigation }) => {
  const [waitTime, setWaitTime] = useState(false);

  const list = useSelector((state) => state.getTodo.list);
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(titleBtnNameMap.All);
  const pressHandler = (item, id) => {
    setClicked(item);
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
      setTimeout(() => setWaitTime(true), 1000);
    } catch (err) {
      console.log("Not found", err);
    }
  }, []);

  let filter;
  if (clicked === titleBtnNameMap.All) {
    filter = "all";
  } else if (clicked === titleBtnNameMap.Completed) {
    filter = true;
  } else if (clicked === titleBtnNameMap.Remaining) {
    filter = false;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Task Category Button*/}
      <CategoryButton
        pressHandler={pressHandler}
        btnNames={titleBtnNameMap}
        clicked={clicked}
      />
      {waitTime ? (
        <ListView list={list} navigation={navigation} filter={filter} />
      ) : (
        <ActivityIndicator color="orange" style={{ flex: 1 }} size="large" />
      )}
    </View>
  );
};

export default ShowList;
