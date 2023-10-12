import { combineEpics } from 'redux-observable';
import initialEpic from './initialEpic';
import loginEpic from './loginEpic';
import registerEpic from './registerEpic';
import logoutEpic from './logoutEpics';
import loginWithExternalEpic from './loginWithExternalEpic';
import listGroupChatEpic from './listGroupChatEpic';
import requestListEpic from './requestListEpic';
import friendlistEpic from './friendlistEpic';


const rootEpic = combineEpics(
  initialEpic,
  loginEpic,
  registerEpic,
  logoutEpic,
  loginWithExternalEpic,
  requestListEpic,
  friendlistEpic,
  listGroupChatEpic
);

export default rootEpic;