import {LIST_CHAT} from '../actions/types';
import {AnyAction} from '@reduxjs/toolkit';

const initialState = {
  data: [],
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
      };
    }

    default:
      return state;
  }
}
