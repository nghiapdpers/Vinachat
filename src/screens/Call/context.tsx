import {
  createContext,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
} from 'react';
import CallScreen from '.';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

// create context
const CallContext = createContext<any>(null);
// create dispatch context
const CallDispatchContext = createContext<Dispatch<any> | any>(null);

const initialState = {
  status: 'freetime',
  data: undefined,
};

// providers
export function CallProvider({children}: any) {
  const [call, dispatch] = useReducer(CallReducer, initialState);

  const list = useSelector((state: any) => state.groupChat?.data);
  const myRef = useSelector((s: any) => s.user?.data?.ref);

  useEffect(() => {
    list.forEach((item: any) => {
      const messageType = item.latest_message_type;
      if (
        (messageType === 'voicecall' && call.status == 'freetime') ||
        (messageType === 'videocall' && call.status == 'freetime')
      ) {
        firestore()
          .collection('groups')
          .doc(item.ref)
          .collection('messages')
          .doc(item.latest_message_ref)
          .get()
          .then(res => {
            if (res.get('call_status')?.toString() == 'living') {
              dispatch(
                CallActions.hasNewCall({
                  type: messageType,
                  name: item.name ? item.name : item.latest_message_from_name,
                  groupRef: item.ref,
                  callId: item.latest_message_ref,
                }),
              );
            }
          })
          .catch(err => {
            console.warn('::::GET CALL MESSAGE ERROR::::', err);
          });
      }

      if (
        (messageType === 'voicecall' &&
          call.status == 'lazy' &&
          item.latest_message_from != myRef) ||
        (messageType === 'videocall' &&
          call.status == 'lazy' &&
          item.latest_message_from != myRef)
      ) {
        firestore()
          .collection('groups')
          .doc(item.ref)
          .collection('messages')
          .doc(item.latest_message_ref)
          .get()
          .then(res => {
            if (res.get('call_status')?.toString() == 'living') {
              firestore()
                .collection('groups')
                .doc(item.ref)
                .collection('messages')
                .doc(item.latest_message_ref)
                .update({
                  call_status: 'dead',
                  end_call_reason: 'Người dùng bận',
                });
            }
          })
          .catch(err => {
            console.warn('::::GET CALL MESSAGE ERROR::::', err);
          });
      }
    });
  }, [list, call.status, myRef]);

  return (
    <CallContext.Provider value={call}>
      <CallDispatchContext.Provider value={dispatch}>
        {children}
        {call.status == 'lazy' && call.data && (
          <CallScreen
            type={call.data.type}
            groupRef={call.data.groupRef}
            name={call.data.name}
            status={call.data.status}
            callId={call.data.callId}
          />
        )}
      </CallDispatchContext.Provider>
    </CallContext.Provider>
  );
}

// reducers
function CallReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'has-new-call': {
      return {
        ...state,
        status: 'lazy',
        data: {
          ...action.payload,
          status: 'receive',
        },
      };
    }

    case 'call-some-one': {
      return {
        ...state,
        status: 'lazy',
        data: {
          ...action.payload,
          status: 'calling',
        },
      };
    }

    case 'end-call': {
      return {
        ...state,
        status: 'freetime',
        data: undefined,
      };
    }
    default:
      return state;
  }
}

// actions
function hasNewCall(data: any) {
  return {
    type: 'has-new-call',
    payload: data,
  };
}

function endCall() {
  return {
    type: 'end-call',
  };
}

function callSomeOne(data: any) {
  return {
    type: 'call-some-one',
    payload: data,
  };
}

export const CallActions = {
  hasNewCall,
  endCall,
  callSomeOne,
};

// hooks
export function useCall() {
  return useContext(CallContext);
}

export function useCallDispatch() {
  return useContext(CallDispatchContext);
}
