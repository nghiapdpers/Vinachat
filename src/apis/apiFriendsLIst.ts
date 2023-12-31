import {getData, storeData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL from './baseURL';
import {LOCALSTORAGE} from '../storage/direct';

export default async function apiFriendsList(data: any) {
  try {
    const url = baseURL.FRIENDS_LIST_URL;
    const apiKey = await getData(LOCALSTORAGE.apikey);

    const res = await apiHelper(url, data, apiKey);

    // console.log('res:>>', res);

    switch (res?.code) {
      case NETWORK.SUCCESS:
        storeData(LOCALSTORAGE.apikey, res?.data?.apiKey);
        storeData(LOCALSTORAGE.friendList, res?.data);

        return Promise.resolve(res?.data);
      case NETWORK.ERROR:
        return Promise.reject(res?.message);
    }
  } catch (error) {
    throw error;
  }
}
