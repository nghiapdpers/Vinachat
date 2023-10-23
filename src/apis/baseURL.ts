// develop domain
const DOMAIN = 'http://192.168.0.123:5000';
// production domain
// const DOMAIN = 'https://shiny-gray-crow.cyclic.app';

export const LOGIN_URL = `${DOMAIN}/api/user/login`;
export const LOGIN_EXTERNAL_URL = `${DOMAIN}/api/user/loginWithExternal`;
export const REGISTER_URL = `${DOMAIN}/api/user/register`;
export const LOGOUT_URL = `${DOMAIN}/api/user/logout`;
export const LIST_GROUP_CHAT = `${DOMAIN}/api/user/getGroupChat`;
export const GET_REQUEST_LIST = `${DOMAIN}/api/user/getRequestList`;
export const REPLY_REQUEST = `${DOMAIN}/api/user/replyRequest`;
export const SEND_MESSAGE = `${DOMAIN}/api/group/sendMessage`;
export const SEARCH_URL = `${DOMAIN}/api/user/search`;
export const CREATE_GROUP_URL = `${DOMAIN}/api/group/create`;
export const FRIENDS_LIST_URL = `${DOMAIN}/api/user/getFriendList`;
export const LOADMORE_MESSAGE = `${DOMAIN}/api/group/getListMessage`;
export const FRIENDS_REQUEST_URL = `${DOMAIN}/api/user/requestFriend`;
export const MESSAGE_SYNCHRONOUS_URL = `${DOMAIN}/api/group/synchronous`;
export const UPDATE_PROFILE_URL = `${DOMAIN}/api/user/update`;
export const GET_DETAIL_USER = `${DOMAIN}/api/user/getDetail`;

export default {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  LOGIN_EXTERNAL_URL,
  LIST_GROUP_CHAT,
  GET_REQUEST_LIST,
  REPLY_REQUEST,
  SEND_MESSAGE,
  SEARCH_URL,
  CREATE_GROUP_URL,
  FRIENDS_LIST_URL,
  LOADMORE_MESSAGE,
  FRIENDS_REQUEST_URL,
  MESSAGE_SYNCHRONOUS_URL,
  UPDATE_PROFILE_URL,
  GET_DETAIL_USER,
};
