import {AnyAction} from 'redux';

const initialState = {
  status: 'freetime',
  data: undefined,
};

// reducers
export default function CallReducer(state = initialState, action: AnyAction) {
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
