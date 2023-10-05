import { combineReducers } from 'redux';
import AppReducer from './appReducer';
import ErrorReducer from './errorReducer';
import UserReducer from './userReducer';
import UserExternalReducer from './userExternalReducer';


const rootReducer = combineReducers({
    app: AppReducer,
    error: ErrorReducer,
    user: UserReducer,
    userExternal: UserExternalReducer
});

export default rootReducer;