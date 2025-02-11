import {CLEAR, LOGIN, LOGIN_EXTERNAL, LOGOUT, REGISTER} from './types';

// LOGIN ACTION
export const actionLoginStart = (
  mobile: string,
  password: string,
  fcmToken: string,
) => {
  //Declare formdata to pass in axios post method
  const form = {
    mobile: mobile,
    password: password,
    fcm_token: fcmToken,
  };

  return {
    type: LOGIN.START,
    payload: form,
  };
};

export const actionLoginEnd = (data: any) => ({
  type: LOGIN.END,
  payload: data,
});

export const actionLoginFail = (data: any) => ({
  type: LOGIN.FAIL,
  payload: data,
});

// LOGIN WITH EXTERNAL ACTION
export const actionLoginExternalStart = (mobile: string, password: string) => {
  //Declare formdata to pass in axios post method
  const form = {
    mobile: mobile,
    password: password,
  };

  return {
    type: LOGIN_EXTERNAL.START,
    payload: form,
  };
};

export const actionLoginExternalEnd = (data: any) => ({
  type: LOGIN_EXTERNAL.END,
  payload: data,
});

export const actionLoginExternalFail = (data: any) => ({
  type: LOGIN_EXTERNAL.FAIL,
  payload: data,
});

// REGISTER ACTION
export const actionRegisterStart = (
  mobile: string,
  fullname: string,
  password: string,
  vid: string,
) => {
  //Declare formdata to pass in axios post method
  const form = {
    mobile: mobile,
    fullname: fullname,
    password: password,
    vid: vid,
  };

  return {
    type: REGISTER.START,
    payload: form,
  };
};

export const actionRegisterEnd = (data: any) => ({
  type: REGISTER.END,
  payload: data,
});

export const actionRegisterFail = (data: any) => ({
  type: REGISTER.FAIL,
  payload: data,
});

// LOGOUT USER
export const actionLogoutStart = {
  type: LOGOUT.START,
};

export const actionLogoutEnd = (data: any) => ({
  type: LOGOUT.END,
  payload: data,
});

export const actionLogoutFail = (data: any) => ({
  type: LOGOUT.FAIL,
  payload: data,
});

// CLEAR USER
export const actionClearUser = {
  type: CLEAR.USER,
};

// CLEAR MESSAGE
export const actionClearMessage = {
  type: CLEAR.MESSAGE,
};
