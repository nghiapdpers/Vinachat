import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {CALL} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import apiCallSomeOne from '../../apis/apiCallSomeOne';
import {CallActions} from '../actions/callActions';

const callEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CALL.CALL_SOME_ONE_START),
    switchMap(async action => {
      return await apiCallSomeOne(action.payload)
        .then(res => {
          return CallActions.call.end(res);
        })
        .catch(msg => {
          if (msg instanceof Error) {
            return riseNetworkError({
              error: msg,
              visible: true,
            });
          }
          return CallActions.call.fail(msg);
        });
    }),
  );

export default callEpic;
