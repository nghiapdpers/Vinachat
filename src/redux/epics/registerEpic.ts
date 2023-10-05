import { switchMap } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { REGISTER } from '../actions/types';
import { actionRegisterEnd, actionRegisterFail } from '../actions/userActions';
import { riseNetworkError } from '../actions/errorHandlerActions';
import apiRegister from '../../apis/apiRegister';

const registerEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(REGISTER.START),
        switchMap(async action => {
            return await apiRegister(action.payload)
                .then(res => {
                    return actionRegisterEnd(res)
                })
                .catch(msg => {
                    if (msg instanceof Error) {
                        return riseNetworkError({
                            error: msg,
                            visible: true,
                        });
                    }
                    return actionRegisterFail(msg);
                });
        }),
    );

export default registerEpic;