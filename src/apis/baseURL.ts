// develop domain
// const DOMAIN = 'http://192.168.110.113:3000';
// production domain
const DOMAIN = 'https://vinachat-functioncloud.onrender.com';

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
export const ADDMEMBER_GROUP_URL = `${DOMAIN}/api/group/addMember`;
export const CHANGEPASSWORD_USER_URL = `${DOMAIN}/api/user/changePassword`;
export const UPDATE_LATEST_MESSAGE = `${DOMAIN}/api/group/updateLatestMessage`;
export const GET_DETAIL_GROUP_CHAT = `${DOMAIN}/api/group/getDetail`;
export const CALL_SOME_ONE = `${DOMAIN}/api/group/callSomeOne`;

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
  CHANGEPASSWORD_USER_URL,
  ADDMEMBER_GROUP_URL,
  UPDATE_LATEST_MESSAGE,
  GET_DETAIL_GROUP_CHAT,
  CALL_SOME_ONE,
};
