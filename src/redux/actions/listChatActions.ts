import {LIST_CHAT} from './types';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type chatProps = {
  ref: string;
  from?: string;
  message?: string;
  sent_time?: FirebaseFirestoreTypes.Timestamp;
  type?: 'text' | 'image';
  status: 'sending' | 'sended';
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

export const listChatActions = {
  merge: mergeListChatData,
  add: addListChatData,
};
