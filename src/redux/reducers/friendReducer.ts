import { FRIENDLIST } from '../actions/types';
import { AnyAction } from 'redux';

const initialState = {
  loading: false,
  friendlist: {
    status: false,
    message: null,
    data: [],
  },
  refreshing: false
};

export default function FriendListReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case FRIENDLIST.START: {
      return {
        ...state,
        loading: true,
      };
    }
    case FRIENDLIST.END:
      return {
        ...state,
        loading: false,
        friendlist: {
          status: false,
          message: null,
          data: action.payload,
        },
      };
    case FRIENDLIST.FAIL:
      return {
        ...action.payload,
        loading: false,
      };
    case FRIENDLIST.ClEAR:
      return initialState;
    case FRIENDLIST.REFRESH:
      return {
        ...state,
        friendlist: {
          status: false,
          message: null,
          data: [],
        },
        refreshing: true,
      };
    case FRIENDLIST.REFRESH_END: {
      return {
        ...state,
        refreshing: false,
      };
    }
    default:
      return state;
  }
}
