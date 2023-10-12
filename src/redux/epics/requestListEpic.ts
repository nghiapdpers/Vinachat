import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {GET_REQUEST_LIST} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import apiGetRequestList from '../../apis/apiGetRequestList';
import {RequestListActions} from '../actions/requestListAction';

const requestListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(GET_REQUEST_LIST.START),
    switchMap(async action => {
      return await apiGetRequestList(action.payload)
        .then(res => {
          return RequestListActions.end(res);
        })
        .catch(msg => {
          if (msg instanceof Error) {
            return riseNetworkError({
              error: msg,
              visible: true,
            });
          }

          return RequestListActions.fail(msg);
        });
    }),
  );

export default requestListEpic;
