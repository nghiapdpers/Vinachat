import {LIST_CHAT} from '../actions/types';
import {AnyAction} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lmTotal: 1,
  lmCurrent: 0,
  lmLoading: false,
  message: undefined,
};

export default function ListChatReducer(
  state = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case LIST_CHAT.MERGE: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case LIST_CHAT.ADD: {
      const updateRef = action.payload.ref;

      let isExist = false;

      let updatedData = state.data.map((item: any) => {
        if (item.ref == updateRef) {
          isExist = true;
          return {
            ...item,
            ...action.payload,
          };
        }

        return item;
      });

      if (isExist == false) {
        updatedData = [action.payload, ...updatedData];
      }

      updatedData = updatedData.slice(0, 20);

      return {
        ...state,
        data: updatedData,
        lmTotal: state.lmTotal + 1,
      };
    }

    case LIST_CHAT.LOADMORE_START: {
      return {
        ...state,
        message: undefined,
        lmLoading: true,
      };
    }

    case LIST_CHAT.LOADMORE_END: {
      const updateData = [
        ...state.data,
        ...action.payload.data.chats.map((item: any) => ({
          ...item,
          status: 'sended',
        })),
      ];

      return {
        ...state,
        message: undefined,
        data: updateData,
        lmTotal: action.payload.data.total_record,
        lmCurrent: updateData.length,
        lmLoading: false,
      };
    }

    case LIST_CHAT.LOADMORE_FAIL: {
      return {
        ...state,
        message: action.payload.message,
        lmLoading: false,
      };
    }

    case LIST_CHAT.LOADMORE_CLEAR: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
