import { combineEpics } from 'redux-observable';
import initialEpic from './initialEpic';
import loginEpic from './loginEpic';
import registerEpic from './registerEpic';
import logoutEpic from './logoutEpics';
import loginWithExternalEpic from './loginWithExternalEpic';

const rootEpic = combineEpics(
    initialEpic,
    loginEpic,
    registerEpic,
    logoutEpic,
    loginWithExternalEpic
);

export default rootEpic;