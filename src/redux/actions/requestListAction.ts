import {GET_REQUEST_LIST} from './types';

function getRequestListStart() {
  return {
    type: GET_REQUEST_LIST.START,
  };
}

function getRequestListEnd(data: any) {
  return {
    type: GET_REQUEST_LIST.END,
    payload: data,
  };
}

function getRequestListFail(msg: string) {
  return {
    type: GET_REQUEST_LIST.FAIL,
    payload: msg,
  };
}

export const RequestListActions = {
  start: getRequestListStart,
  end: getRequestListEnd,
  fail: getRequestListFail,
};
