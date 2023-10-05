import { switchMap } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { LOGOUT } from '../actions/types';
import { actionLogoutEnd, actionLogoutFail } from '../actions/userActions';
import { riseNetworkError } from '../actions/errorHandlerActions';
import apiLogout from '../../apis/apiLogout';

const logoutEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(LOGOUT.START),
        switchMap(async action => {
            return await apiLogout(action.payload)
                .then(res => {
                    return actionLogoutEnd(res)
                }).catch(msg => {
                    if (msg instanceof Error) {
                        return riseNetworkError({
                            error: msg,
                            visible: true,
                        });
                    }
                    return actionLogoutFail(msg);
                });
        }),
    );

export default logoutEpic;