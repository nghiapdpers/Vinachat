import { REGISTER_USERS, REGISTER_USERS_FAILED, REGISTER_USERS_SUCCESS, SET_API_INIT } from "./actionTypes";

export const setApiInit = (data: any) => ({
    type: SET_API_INIT,
    payload: data,
});

export const registerUser = (fullname: string, email: string, number: string, password: string, repeatPassword: string, referralBy: string) => ({
    type: REGISTER_USERS,
    payload: { fullname, email, number, password, repeatPassword, referralBy },
});

export const registerUsersSuc = (users: any) => ({
    type: REGISTER_USERS_SUCCESS,
    payload: users,
});

export const registerUsersFai = (error: any) => ({
    type: REGISTER_USERS_FAILED,
    payload: error,
});