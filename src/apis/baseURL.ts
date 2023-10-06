const DOMAIN = 'http://127.0.0.1:5003';

export const LOGIN_URL = `${DOMAIN}/api/user/login`;
export const LOGIN_EXTERNAL_URL = `${DOMAIN}/api/user/loginWithExternal`;
export const REGISTER_URL = `${DOMAIN}/api/user/register`;
export const LOGOUT_URL = `${DOMAIN}/api/user/logout`;
export const SEARCH_URL = `${DOMAIN}/api/user/search`;
export const CREATE_GROUP_URL = `${DOMAIN}/api/group/create`;
export const FRIENDS_LIST_URL = `${DOMAIN}/api/user/getFriendList`;

export default {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  LOGIN_EXTERNAL_URL,
  SEARCH_URL,
  CREATE_GROUP_URL,
  FRIENDS_LIST_URL
};