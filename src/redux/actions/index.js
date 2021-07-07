import {
    ADD_TODO, 
    REMOVE_TODO, 
    TOGGLE_TODO,
    EDIT_TODO,
} from './actionTypes';

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

export const editItem = (value, index) => {
    return {
        type: EDIT_TODO,
        value,
        index,
    }
}