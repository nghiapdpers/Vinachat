import {createContext, useReducer, Dispatch, useContext} from 'react';
import {Asset} from 'react-native-image-picker';

const initialState = {
  data: [],
};

const ChosenImageContext = createContext<any>(null);

const ChosenImageDispatchContext = createContext<any | Dispatch<any>>(null);

export function ChosenImageProvider({children}: any) {
  const [images, dispatch] = useReducer(ChosenImageReducer, initialState);

  return (
    <ChosenImageContext.Provider value={images.data}>
      <ChosenImageDispatchContext.Provider value={dispatch}>
        {children}
      </ChosenImageDispatchContext.Provider>
    </ChosenImageContext.Provider>
  );
}

function ChosenImageReducer(state: any, action: any) {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }

    case 'remove': {
      const head = state.data.slice(0, action.payload);
      const foot = state.data.slice(action.payload + 1);

      return {
        ...state,
        data: [...head, ...foot],
      };
    }

    case 'new': {
      return {
        ...state,
        data: action.payload,
      };
    }

    case 'remove all': {
      return {
        ...state,
        data: [],
      };
    }

    default:
      return state;
  }
}

export function useChosenImageContext() {
  return useContext(ChosenImageContext);
}

export function useChosenImageDispatch() {
  return useContext(ChosenImageDispatchContext);
}

export const chosenImageActions = {
  add: (data: Asset[]) => ({
    type: 'add',
    payload: data,
  }),

  remove: (index: number) => ({
    type: 'remove',
    payload: index,
  }),

  new: (data: Asset[]) => ({
    type: 'new',
    payload: data,
  }),

  removeAll: () => ({
    type: 'remove all',
  }),
};
