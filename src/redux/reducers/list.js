import {UPDATE_TODO} from '../actions/actionTypes';

const initialState = {
    list: []
}

const getTodo = (state=initialState, action) => {
    switch (action.type) {
        case UPDATE_TODO:
            return {
                ...state,
                list: action.data
            }
        default:
            return state
    }
}

export default getTodo;