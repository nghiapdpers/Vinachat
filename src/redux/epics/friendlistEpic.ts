import { switchMap } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { FRIENDLIST } from '../actions/types';
import { actionFriendListEnd, actionFriendListFail } from '../actions/friendAction';
import { riseNetworkError } from '../actions/errorHandlerActions';
import apiFriendsList from '../../apis/apiFriendsLIst';

const friendlistEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(FRIENDLIST.START),
        switchMap(async action => {
            return await apiFriendsList(action.payload)
                .then(res => {
                    return actionFriendListEnd(res)
                }).catch(msg => {
                    if (msg instanceof Error) {
                        return riseNetworkError({
                            error: msg,
                            visible: true,
                        });
                    }
                    return actionFriendListFail(msg);
                });
        }),
    );

export default friendlistEpic;