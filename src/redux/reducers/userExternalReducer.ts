import { CLEAR, LOGIN_EXTERNAL, LOGOUT } from '../actions/types';
import { AnyAction } from 'redux';

const initialState = {
    loading: false,
    login: {
        status: false,
        message: null,
    },
    register: {
        status: false,
        message: null
    }
};

export default function UserExternalReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case LOGIN_EXTERNAL.START:
        case LOGOUT.START:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_EXTERNAL.END:
            // console.log('ac:>>', action.payload);
            return {
                ...action.payload,
                loading: false,
                login: {
                    status: true,
                    message: action.payload.message,
                },
            }
        case LOGIN_EXTERNAL.FAIL:
            console.log('ac:>>>', action.payload);
            return {
                ...action.payload,
                loading: false,
                login: {
                    message: action.payload.message,
                }
            };
        case LOGOUT.END:
            return {
                ...action.payload,
                loading: false,
                login: {
                    status: false,
                    message: null
                },
                register: {
                    status: false,
                    message: null
                }
            }
        case LOGOUT.FAIL:
            return {
                ...action.payload,
                loading: false
            };
        case CLEAR.MESSAGE:
            return {
                ...state,
                login: {
                    message: null,
                },
                register: {
                    message: null
                }
            }
        default:
            return state;
    }
}