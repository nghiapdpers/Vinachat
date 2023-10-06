const DOMAIN = 'http://10.0.2.2:5000';

export const LOGIN_URL = `${DOMAIN}/api/user/login`;
export const LOGIN_EXTERNAL_URL = `${DOMAIN}/api/user/loginWithExternal`;
export const REGISTER_URL = `${DOMAIN}/api/user/register`;
export const LOGOUT_URL = `${DOMAIN}/api/user/logout`;
export const GET_REQUEST_LIST = `${DOMAIN}/api/user/getRequestList`;
export const REPLY_REQUEST = `${DOMAIN}/api/user/replyRequest`;
export const SEND_MESSAGE = `${DOMAIN}/api/group/sendMessage`;

export default {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  LOGIN_EXTERNAL_URL,
  GET_REQUEST_LIST,
  REPLY_REQUEST,
  SEND_MESSAGE,
};
