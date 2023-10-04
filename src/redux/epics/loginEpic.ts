import { switchMap } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { LOGIN } from '../actions/types';
import { actionLoginEnd, actionLoginFail } from '../actions/userActions';
import apiLogin from '../../apis/apiLogin'
import { riseNetworkError } from '../actions/errorHandlerActions';

const loginEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LOGIN.START),
    switchMap(async action => {
      return await apiLogin(action.payload)
        .then(res => {
          return actionLoginEnd(res)
        }).catch(msg => {
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

export default loginEpic;