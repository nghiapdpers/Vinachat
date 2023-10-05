import { INITIAL } from './types';

const form = new FormData();
form.append('app_name', 'khttest');

export const actionInitialStart = {
    type: INITIAL.START,
    payload: form,
};

export const actionInitialEnd = (data: any) => ({
    type: INITIAL.END,
    payload: data,
});

export const actionInitialFail = (data: any) => ({
    type: INITIAL.FAIL,
    payload: data,
});

//Clear app data action
export const clientInitialApiClear = {
    type: INITIAL.CLEAR,
};