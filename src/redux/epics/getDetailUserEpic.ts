import {GET_DETAIL_USER} from '../actions/types';
import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {riseNetworkError} from '../actions/errorHandlerActions';
import apiGetDetailUser from '../../apis/apiGetDetailUser';
import {actionLoginEnd, actionLoginFail} from '../actions/userActions';

const getDetailUserEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(GET_DETAIL_USER.START),
    switchMap(async action => {
      return await apiGetDetailUser(action.payload)
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

export default getDetailUserEpic;
