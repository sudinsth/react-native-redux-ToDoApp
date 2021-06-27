// const todo = (state=[], action)=> {
//     switch(action.type){
//         case 'ADD_TODO_SAGA':
//             return[
//                 ...state,{
//                     id:action.id,
//                     text:action.text,
//                     completed: false
//                 }
//             ]


//         case 'TOGGLE_TODO_SAGA':
//             return state.map(todo=>(todo.id === action.id)?{...todo, completed:!todo.completed}: todo)    
            
//         // case 'REMOVE_TODO_SAGA':
//         //     return state.filter(todo => {
//         //         return todo.id !== action.id
//         //     });
        
//         default:
//             return state
//     }
// }

import { UPDATE_TODO } from "../actions/actionTypes";

const initialState = {
    text: []
}

const todo = (state= initialState, action) => {
    switch (action.type) {
        case UPDATE_TODO:
            return {
                ...state,
                text: action.text
            }
        default:
            return state
    }
}

export default todo;