import {GET_REQUEST_LIST} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  loading: false,
  message: undefined,
  data: [],
};

export default function RequestListReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case GET_REQUEST_LIST.START: {
      return {
        ...state,
        loading: true,
        message: undefined,
      };
    }

    case GET_REQUEST_LIST.END: {
      return {
        ...state,
        loading: false,
        message: undefined,
        data: action.payload.data,
      };
    }

    case GET_REQUEST_LIST.FAIL: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    }

    default:
      return state;
  }
}
