import { switchMap } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { GROUPCHAT } from '../actions/types';
import { riseNetworkError } from '../actions/errorHandlerActions';
import { actionListGroupChatEnd, actionListGroupChatFail } from '../actions/listGroupChat';
import apiListGroupChat from '../../apis/apiListGroupChat';

const listGroupChatEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(GROUPCHAT.START),
        switchMap(async action => {
            return await apiListGroupChat(action.payload)
                .then(res => {
                    return actionListGroupChatEnd(res)
                }).catch(msg => {
                    if (msg instanceof Error) {
                        return riseNetworkError({
                            error: msg,
                            visible: true,
                        });
                    }
                    return actionListGroupChatFail(msg);
                });
        }),
    );

export default listGroupChatEpic;