import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  IMPORTANT_TODO,
  UPDATE_TODO,
} from "./actionTypes";

export const addItem = (value) => {
  return {
    type: ADD_TODO,
    value,
  };
};

export const removeItem = (identify, index) => {
  return {
    type: REMOVE_TODO,
    identify,
    index,
  };
};

export const toggleItem = (identify, index) => {
  return {
    type: TOGGLE_TODO,
    identify,
    index,
  };
};

export const editItem = (value, index, identify) => {
  return {
    type: EDIT_TODO,
    value,
    index,
    identify,
  };
};

export const importantItem = (identify, index) => {
  return {
    type: IMPORTANT_TODO,
    identify,
    index,
  };
};

export const updateTodo = (data) => {
  return {
    type: UPDATE_TODO,
    data,
  };
};
