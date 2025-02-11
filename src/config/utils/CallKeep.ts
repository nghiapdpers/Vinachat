import RNCallKeep from 'react-native-callkeep';

class CallKeep {
  config(answerCallback: () => void, declineCallback: () => void) {
    RNCallKeep.addEventListener('answerCall', answerCallback);
    RNCallKeep.addEventListener('endCall', declineCallback);
  }

  startCall(callId: string, number: string, identifier: string) {
    RNCallKeep.startCall(callId, number, identifier);
  }

  removeEvents() {
    RNCallKeep.removeEventListener('answerCall');
    RNCallKeep.removeEventListener('endCall');
  }

  endCall(callId: string) {
    RNCallKeep.endCall(callId);
    this.removeEvents();
  }

  rejectCall(callId: string) {
    RNCallKeep.rejectCall(callId);
    this.removeEvents();
  }

  answerCall(callId: string) {
    RNCallKeep.answerIncomingCall(callId);
  }

  displayImcomingCall(
    callId: string,
    number: string,
    localizedCallerName: string,
  ) {
    RNCallKeep.displayIncomingCall(callId, number, localizedCallerName);
  }

  backToForeground() {
    RNCallKeep.backToForeground();
  }
}

export const callKeep = new CallKeep();
