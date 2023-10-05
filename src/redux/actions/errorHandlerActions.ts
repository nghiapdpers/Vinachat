import { ERROR } from './types';
import { NormalErrorProps, NetworkErrorProps } from '../reducers/errorReducer';

// normal error actions
export const riseNormalError = (data: NormalErrorProps) => ({
    type: ERROR.NORMAL_RISE,
    payload: data,
});

export const hideNormalError = () => ({
    type: ERROR.NORMAL_HIDE,
});

// network error actions
export const riseNetworkError = (data: NetworkErrorProps) => ({
    type: ERROR.NETWORK_RISE,
    payload: data,
});

export const hideNetworkError = () => ({
    type: ERROR.NETWORK_HIDE,
});