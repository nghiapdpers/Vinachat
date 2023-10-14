import {LIST_CHAT} from './types';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type chatProps = {
  ref: string;
  from?: string;
  message?: string;
  sent_time?: FirebaseFirestoreTypes.Timestamp;
  type?: 'text' | 'image';
  status: 'sending' | 'sended';
  from_name: string;
  images?: any[];
};

function mergeListChatData(data: chatProps[]) {
  return {
    type: LIST_CHAT.MERGE,
    payload: data,
  };
}

function addListChatData(data: chatProps) {
  return {
    type: LIST_CHAT.ADD,
    payload: data,
  };
}

function loadmoreListChatDataS(groupRef: string, last_chat_id: string) {
  return {
    type: LIST_CHAT.LOADMORE_START,
    payload: {
      group_ref: groupRef,
      page: 2,
      last_chat_id: last_chat_id,
    },
  };
}

function loadmoreListChatDataE(data: any) {
  return {
    type: LIST_CHAT.LOADMORE_END,
    payload: data,
  };
}

function loadmoreListChatDataF(data: any) {
  return {
    type: LIST_CHAT.LOADMORE_FAIL,
    payload: data,
  };
}

function listChatDataClear() {
  return {
    type: LIST_CHAT.LOADMORE_CLEAR,
  };
}

export const listChatActions = {
  merge: mergeListChatData,
  add: addListChatData,
  loadmore_start: loadmoreListChatDataS,
  loadmore_end: loadmoreListChatDataE,
  loadmore_fail: loadmoreListChatDataF,
  clear: listChatDataClear,
};
