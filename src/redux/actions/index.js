import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './actionTypes';

export const addItem = (value) => {
    return {
        type: ADD_TODO,
        value
    }
}

export const removeItem = (index) => {
    return {
        type: REMOVE_TODO,
        index
    }
}

export const toggleItem = (index) => {
    return {
        type: TOGGLE_TODO,
        index
    }
}