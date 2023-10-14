import {getData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL from './baseURL';
import {LOCALSTORAGE} from '../storage/direct';

export default async function apiLoadmoreMessage(data: any) {
  try {
    const url = baseURL.LOADMORE_MESSAGE;

    const apiKey = await getData(LOCALSTORAGE.apikey);

    const res = await apiHelper(url, data, apiKey);

    switch (res?.code) {
      case NETWORK.SUCCESS:
        return Promise.resolve(res?.data);
      case NETWORK.ERROR:
        return Promise.reject(res?.message);
    }
  } catch (error) {
    throw error;
  }
}
