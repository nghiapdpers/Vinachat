import {GET_DETAIL_GROUP_CHAT} from '../actions/types';
import {AnyAction} from 'redux';

const initialState = {
  ref: '',
  adminRef: '',
  total_member: '',
  name: '',
  groupAvatar: '',
  members: [],

  loading: true,
  message: undefined,
};

export default function detailGroupChatReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case GET_DETAIL_GROUP_CHAT.START: {
      return {
        ...state,
        loading: true,
        message: undefined,
      };
    }

    case GET_DETAIL_GROUP_CHAT.END: {
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        message: undefined,
      };
    }

    case GET_DETAIL_GROUP_CHAT.FAIL: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    }

    case GET_DETAIL_GROUP_CHAT.CLEAR: {
      return initialState;
    }

    default:
      return state;
  }
}
