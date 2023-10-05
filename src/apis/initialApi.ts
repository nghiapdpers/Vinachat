import { multiStoreData, storeData } from '../storage';
import apiHelper, { NETWORK } from './apiHelper';
import baseURL from './baseURL';
import { LOCALSTORAGE } from '../storage/direct';

export default async function api_initial_client(data: FormData) {
  try {
    const respone: any = await apiHelper(baseURL.base_url, data);

    switch (respone?.code) {
      case NETWORK.SUCCESS:
        // Store data and call to getdomain and api in callback
        multiStoreData([
          [LOCALSTORAGE.main_domain, respone.data.data.main_domain],
          [LOCALSTORAGE.apikey, respone.data.data.apikey],
        ]);
        // store app data
        storeData(LOCALSTORAGE.app, respone.data.data);

        return Promise.resolve(respone?.data.data);
      case NETWORK.ERROR:
        return Promise.reject(respone?.message);
    }
  } catch (err) {
    throw err;
  }
}