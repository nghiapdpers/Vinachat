import { FRIENDLIST } from '../actions/types';
import { AnyAction } from 'redux';

const initialState = {
  loading: false,
  friendlist: {
    status: false,
    message: null,
    data: [],
  },
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
    default:
      return state;
  }
}
