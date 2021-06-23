import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO, ADD_TODO_SAGA, REMOVE_TODO_SAGA, TOGGLE_TODO_SAGA } from './actionTypes';

let nextId = 0;
export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextId++,
    text
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})

export const removeTodo = (id) => ({
    type: REMOVE_TODO,
    id
})

export const addTodoSaga = (text) => ({
    type: ADD_TODO_SAGA,
    id: nextId++,
    text
})

export const toggleTodoSaga = (id) => ({
    type: TOGGLE_TODO_SAGA,
    id
})

export const removeTodoSaga = (id) => ({
    type: REMOVE_TODO_SAGA,
    id
})
