import { combineReducers } from 'redux';
import AppReducer from './appReducer';
import ErrorReducer from './errorReducer';
import UserReducer from './userReducer';
import UserExternalReducer from './userExternalReducer';
import listGroupChatReducer from './listGroupChatReducer';


const rootReducer = combineReducers({
    app: AppReducer,
    error: ErrorReducer,
    user: UserReducer,
    userExternal: UserExternalReducer,
    groupChat: listGroupChatReducer
});

export default rootReducer;