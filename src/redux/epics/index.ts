import {combineEpics} from 'redux-observable';
import initialEpic from './initialEpic';
import loginEpic from './loginEpic';
import registerEpic from './registerEpic';
import logoutEpic from './logoutEpics';
import loginWithExternalEpic from './loginWithExternalEpic';
import listGroupChatEpic from './listGroupChatEpic';
import requestListEpic from './requestListEpic';
import friendlistEpic from './friendlistEpic';
import listChatEpic from './listChatEpic';
import getDetailUserEpic from './getDetailUserEpic';
import getDetailGroupChatEpic from './getDetailGroupChatEpic';
import callEpic from './callEpic';

const rootEpic = combineEpics(
  initialEpic,
  loginEpic,
  registerEpic,
  logoutEpic,
  loginWithExternalEpic,
  requestListEpic,
  friendlistEpic,
  listGroupChatEpic,
  listChatEpic,
  getDetailUserEpic,
  getDetailGroupChatEpic,
  callEpic,
);

export default rootEpic;
