import {combineReducers} from 'redux';
import AppReducer from './appReducer';
import ErrorReducer from './errorReducer';
import UserReducer from './userReducer';
import UserExternalReducer from './userExternalReducer';
import RequestListReducer from './requestListReducer';
import ListChatReducer from './listChatReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  error: ErrorReducer,
  user: UserReducer,
  userExternal: UserExternalReducer,
  requestList: RequestListReducer,
  listChat: ListChatReducer,
});

export default rootReducer;
