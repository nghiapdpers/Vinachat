import { ERROR } from '../actions/types';
import { AnyAction } from 'redux';

export type NormalErrorProps = {
    message: string | undefined;
    duration: number;
};

export type NetworkErrorProps = {
    error: Error | undefined;
    visible: boolean;
};

type InitialType = {
    networkLoading: boolean;
    normal: NormalErrorProps[];
    network: NetworkErrorProps;
};

const initialState: InitialType = {
    networkLoading: false,
    normal: [],
    network: {
        error: undefined,
        visible: false,
    },
};

export default function ErrorHandlerReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        // network error handle
        case ERROR.NETWORK_RISE: {
            return {
                ...state,
                network: action.payload,
                networkLoading: true,
            };
        }
        case ERROR.NETWORK_HIDE: {
            return {
                ...state,
                network: {
                    message: undefined,
                    visible: false,
                },
                networkLoading: false,
            };
        }

        // normal error handle (queue)
        case ERROR.NORMAL_RISE: {
            let queue = [...state.normal];

            if (action.payload.message !== queue[queue.length - 1]?.message) {
                queue = [
                    ...queue,
                    {
                        message: action.payload.message,
                        duration: action.payload.duration,
                    },
                ];
            }

            return {
                ...state,
                normal: queue,
            };
        }
        case ERROR.NORMAL_HIDE: {
            let queue = [...state.normal];
            queue.shift();

            return {
                ...state,
                normal: queue,
            };
        }

        default:
            return state;
    }
}