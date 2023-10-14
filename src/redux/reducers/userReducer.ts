import {CLEAR, LOGIN, LOGOUT, REGISTER} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  login: {
    status: false,
    message: null,
  },
  register: {
    status: false,
    message: null,
  },
};

export default function UserReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case REGISTER.START:
    case LOGIN.START:
    case LOGOUT.START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN.END:
      console.log('REDUCER LOGIN >>', action.payload);

      return {
        ...action.payload,
        loading: false,
        login: {
          status: true,
          message: action.payload?.message,
        },
      };
    case LOGIN.FAIL:
      console.log('acdf: >>', action.payload);
      return {
        ...state,
        loading: false,
        login: {
          status: false,
          message: action.payload.message,
        },
      };
    case REGISTER.END:
      return {
        ...action.payload,
        loading: false,
        register: {
          status: true,
        },
        login: {
          status: true,
        },
      };
    case REGISTER.FAIL:
      return {
        ...state,
        loading: false,
        register: {
          status: false,
          message: action.payload,
        },
      };
    case LOGOUT.END:
      return {
        ...action.payload,
        loading: false,
        login: {
          status: false,
          message: null,
        },
        register: {
          status: false,
          message: null,
        },
      };
    case LOGOUT.FAIL:
      return {
        ...action.payload,
        loading: false,
      };
    case CLEAR.USER:
      return initialState;
    case CLEAR.MESSAGE:
      return {
        ...state,
        login: {
          message: null,
        },
        register: {
          message: null,
        },
      };
    default:
      return state;
  }
}
