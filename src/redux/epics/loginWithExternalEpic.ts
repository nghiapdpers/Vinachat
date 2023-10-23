import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {LOGIN_EXTERNAL} from '../actions/types';
import {
  actionLoginEnd,
  actionLoginExternalEnd,
  actionLoginExternalFail,
  actionLoginFail,
} from '../actions/userActions';
import {riseNetworkError} from '../actions/errorHandlerActions';
import apiLoginWithExternal from '../../apis/apiLoginWithExternal';

const loginWithExternalEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LOGIN_EXTERNAL.START),
    switchMap(async action => {
      return await apiLoginWithExternal(action.payload)
        .then(res => {
          return actionLoginEnd(res);
        })
        .catch(msg => {
          if (msg instanceof Error) {
            return riseNetworkError({
              error: msg,
              visible: true,
            });
          }
          return actionLoginFail(msg);
        });
    }),
  );

export default loginWithExternalEpic;
