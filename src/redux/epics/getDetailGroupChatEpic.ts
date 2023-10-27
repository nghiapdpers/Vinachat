import {GET_DETAIL_GROUP_CHAT} from '../actions/types';
import {switchMap} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {riseNetworkError} from '../actions/errorHandlerActions';
import apiGetDetailGroupChat from '../../apis/apiGetDetailGroupChat';
import {DetailGroupChatActions} from '../actions/getDetailGroupChatActions';

const getDetailGroupChatEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(GET_DETAIL_GROUP_CHAT.START),
    switchMap(async action => {
      return await apiGetDetailGroupChat(action.payload)
        .then(res => {
          return DetailGroupChatActions.end(res);
        })
        .catch(msg => {
          if (msg instanceof Error) {
            return riseNetworkError({
              error: msg,
              visible: true,
            });
          }
          return DetailGroupChatActions.fail(msg);
        });
    }),
  );

export default getDetailGroupChatEpic;
