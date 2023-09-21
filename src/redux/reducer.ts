import { SET_API_INIT } from "./actionTypes";

const initialState = {
    apiInit: null,
}

function postReducers(state = initialState, action: any) {
    switch (action.type) {
        case SET_API_INIT:
            return {
                ...state,
                apiInit: action.payload,
            }
        default:
            return state;
    }
}

export default postReducers;