import React from "react";
import { useSelector } from "react-redux";

import { ListView } from "../component/listView";

const ImportantTodo = ({ navigation }) => {
  const list = useSelector((state) => state.getTodo.list);

  return <ListView list={list} navigation={navigation} filter={"important"} />;
};

export { ImportantTodo };
