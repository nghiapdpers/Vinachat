import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {LIST_CHAT} from '../actions/types';
import {riseNetworkError} from '../actions/errorHandlerActions';
import apiLoadmoreMessage from '../../apis/apiLoadmoreMessage';
import {listChatActions} from '../actions/listChatActions';

const listChatEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LIST_CHAT.LOADMORE_START),
    switchMap(async action => {
      return await apiLoadmoreMessage(action.payload)
        .then(res => {
          return listChatActions.loadmore_end(res);
        })
        .catch(msg => {
          if (msg instanceof Error) {
            return riseNetworkError({
              error: msg,
              visible: true,
            });
          }

          return listChatActions.loadmore_fail(msg);
        });
    }),
  );

export default listChatEpic;
