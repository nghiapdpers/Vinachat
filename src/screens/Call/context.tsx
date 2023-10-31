import {
  createContext,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
} from 'react';
import CallScreen from '.';
import { useSelector } from 'react-redux';
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
export function CallProvider({ children }: any) {
  const [call, dispatch] = useReducer(CallReducer, initialState);

  const list = useSelector((state: any) => state.groupChat?.data);
  const myRef = useSelector((s: any) => s.user?.data?.ref);
  const callId = call.data?.callId;
  const callstatus = call?.status;
  console.log('call ID', callId);
  console.log('call status', callstatus);




  useEffect(() => {
    // nguyên nhân lỗi: useEffect có call.status là dependencies, nên khi có cuộc gọi mới thì đầu tiên sẽ gọi action hasNewCall => call.status thay đổi => effect thực hiện lại => call.status == 'lazy' => tự động hủy cuộc gọi.
    // fix lỗi: thiêm điều kiện kiểm tra cuộc gọi mới có phải là cuộc gọi hiện tại hay không.

    list.forEach((item: any) => {
      const isCalling = item?.latest_message_type?.includes('call');
      // console.log(item.latest_message_from != myRef);
      
      if (isCalling && callstatus == 'freetime') {
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
                  type: item.latest_message_type,
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
        isCalling &&
        callstatus == 'lazy' &&
        item.latest_message_from != myRef &&
        item.latest_message_ref != callId
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
                  end_call_reason: 'Người dùng bận 1234',
                });
            }
          })
          .catch(err => {
            console.warn('::::GET CALL MESSAGE ERROR::::', err);
          });
      }
    });
  }, [list, myRef, callId, callstatus]);

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
