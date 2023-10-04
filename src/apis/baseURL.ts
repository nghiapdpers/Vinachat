const DOMAIN = 'http://10.0.2.2:5000';

export const LOGIN_URL = `${DOMAIN}/api/user/login`;
export const LOGIN_EXTERNAL_URL = `${DOMAIN}/api/user/loginWithExternal`;
export const REGISTER_URL = `${DOMAIN}/api/user/register`;
export const LOGOUT_URL = `${DOMAIN}/api/user/logout`;

export default {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  LOGIN_EXTERNAL_URL
};