import {FRIENDLIST} from './types';

export const actionFriendListStart = {
  type: FRIENDLIST.START,
};

export const actionFriendListEnd = (data: any) => ({
  type: FRIENDLIST.END,
  payload: data,
});

export const actionFriendListFail = (data: any) => ({
  type: FRIENDLIST.FAIL,
  payload: data,
});
