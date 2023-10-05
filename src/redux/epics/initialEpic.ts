import { mergeMap, switchMap } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { INITIAL } from '../actions/types';
import { actionInitialEnd, actionInitialFail } from '../actions/appActions';
import api_initial_client from '../../apis/initialApi';
import { riseNetworkError } from '../actions/errorHandlerActions';

const initialEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(INITIAL.START),
    switchMap(async action => {
      return await api_initial_client(action.payload)
        .then(res => {
          return actionInitialEnd(res)
        })
        .catch(err => {
          if (err instanceof Error) {
            return riseNetworkError({
              error: err,
              visible: true,
            });
          }
          return actionInitialFail(err);
        });
    }),
  );

export default initialEpic;