import { combineReducers } from 'redux';
import AppReducer from './appReducer';
import ErrorReducer from './errorReducer';
import UserReducer from './userReducer';
import UserExternalReducer from './userExternalReducer';
import listGroupChatReducer from './listGroupChatReducer';
import RequestListReducer from './requestListReducer';
import ListChatReducer from './listChatReducer';
import FriendListReducer from './friendReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  error: ErrorReducer,
  user: UserReducer,
  userExternal: UserExternalReducer,
  groupChat: listGroupChatReducer,
  requestList: RequestListReducer,
  listChat: ListChatReducer,
  friendlist: FriendListReducer,
});

export default rootReducer;
