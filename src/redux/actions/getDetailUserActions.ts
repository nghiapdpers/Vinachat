import {GET_DETAIL_USER} from './types';

function getDetailUserStart() {
  return {
    type: GET_DETAIL_USER.START,
  };
}

export const getDetailUserActions = {
  start: getDetailUserStart,
};
