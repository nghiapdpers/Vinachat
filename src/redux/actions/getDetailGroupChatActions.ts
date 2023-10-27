import {GET_DETAIL_GROUP_CHAT} from './types';

function start(groupRef: string) {
  return {
    type: GET_DETAIL_GROUP_CHAT.START,
    payload: {
      group_ref: groupRef,
    },
  };
}

function end(data: any) {
  return {
    type: GET_DETAIL_GROUP_CHAT.END,
    payload: data,
  };
}

function fail(data: any) {
  return {
    type: GET_DETAIL_GROUP_CHAT.FAIL,
    payload: data,
  };
}

function clear() {
  return {
    type: GET_DETAIL_GROUP_CHAT.CLEAR,
  };
}

export const DetailGroupChatActions = {
  start,
  end,
  fail,
  clear,
};
