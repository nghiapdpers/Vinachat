import { storeData } from '../storage';
import apiHelper, { NETWORK } from './apiHelper';
import baseURL from './baseURL';
import { LOCALSTORAGE } from '../storage/direct';

export default async function apiLogin(data: any) {
    try {
        const url = baseURL.LOGIN_URL;

        const res = await apiHelper(url, data);

        console.log('res:>>', res);

        switch (res?.code) {
            case NETWORK.SUCCESS:
                //store user data
                storeData(LOCALSTORAGE.apikey, res?.data?.apiKey);
                storeData(LOCALSTORAGE.user, res?.data);

                return Promise.resolve(res?.data);
            case NETWORK.ERROR:
                return Promise.reject(res?.message);
        }

    } catch (error) {
        throw error;
    }
}