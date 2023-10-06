import {combineEpics} from 'redux-observable';
import initialEpic from './initialEpic';
import loginEpic from './loginEpic';
import registerEpic from './registerEpic';
import logoutEpic from './logoutEpics';
import loginWithExternalEpic from './loginWithExternalEpic';
import requestListEpic from './requestListEpic';

const rootEpic = combineEpics(
  initialEpic,
  loginEpic,
  registerEpic,
  logoutEpic,
  loginWithExternalEpic,
  requestListEpic,
);

export default rootEpic;
