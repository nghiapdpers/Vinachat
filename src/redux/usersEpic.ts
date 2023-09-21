import { mergeMap, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { registerUsersFai, registerUsersSuc } from './actions';
import { REGISTER_USERS } from './actionTypes';

// Tạo FormData cho Login
const FORM_DATA_REGISTER = ({ fullname, email, password, number, referralBy }: { fullname: string, email: string, password: string, number: string, referralBy: string }) => {
    const data = new FormData()
    data.append("fullname", fullname)
    data.append("email", email)
    data.append("mobile", number)
    data.append("password", password)
    data.append("referral_by", referralBy)
    return data
}

// Đăng ký
export const registerEpic = action$ =>
    action$.pipe(
        ofType(REGISTER_USERS),
        switchMap(async (action) => {
            try {
                // Get Domain && APIKEY dưới Local
                const mainDomain = await AsyncStorage.getItem('domain');
                const apiKey = await AsyncStorage.getItem('apiKey');

                const formData = FORM_DATA_REGISTER({ fullname: action?.payload?.fullname, email: action?.payload?.email, number: action?.payload?.number, password: action?.payload?.password, referralBy: action?.payload?.referralBy });
                const response = await axios.post(`${mainDomain}/client_init/register?apikey=${apiKey}`, formData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('epic :>> ', response.data);
                if (response.data.message === 'success') {
                    console.log(response.data);
                    return registerUsersSuc(response.data)
                } else {
                    console.log(response.data.message);
                    return registerUsersFai(response.data.message);
                }
            } catch (error) {
                // Handle errors from the axios request
                console.error(error);
            }
        })
    );