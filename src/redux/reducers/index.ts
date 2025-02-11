import {combineReducers} from 'redux';
import AppReducer from './appReducer';
import ErrorReducer from './errorReducer';
import UserReducer from './userReducer';
import UserExternalReducer from './userExternalReducer';
import listGroupChatReducer from './listGroupChatReducer';
import RequestListReducer from './requestListReducer';
import ListChatReducer from './listChatReducer';
import FriendListReducer from './friendReducer';
import detailGroupChatReducer from './detailGroupChatReducer';
import CallReducer from './callReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  error: ErrorReducer,
  user: UserReducer,
  userExternal: UserExternalReducer,
  groupChat: listGroupChatReducer,
  requestList: RequestListReducer,
  listChat: ListChatReducer,
  friendlist: FriendListReducer,
  detailGroup: detailGroupChatReducer,
  call: CallReducer,
});

export default rootReducer;
