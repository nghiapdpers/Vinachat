import {CALL} from './types';

type DataInterface = {
  group_ref: string;
  callPath: string;
  callerOffer: string;
  callType: string;
};

function hasNewCall() {
  return {
    type: 'has-new-call',
  };
}

function endCall() {
  return {
    type: 'end-call',
  };
}

function callSomeOneStart(data: DataInterface) {
  return {
    type: CALL.CALL_SOME_ONE_START,
    payload: data,
  };
}

function callSomeOneEnd(data: any) {
  return {
    type: CALL.CALL_SOME_ONE_END,
    payload: data,
  };
}

function callSomeOneFail(msg: any) {
  return {
    type: CALL.CALL_SOME_ONE_FAIL,
    payload: msg,
  };
}

export const CallActions = {
  hasNewCall,
  endCall,
  call: {
    start: callSomeOneStart,
    end: callSomeOneEnd,
    fail: callSomeOneFail,
  },
};
