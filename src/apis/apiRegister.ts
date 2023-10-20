import {storeData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL from './baseURL';
import {LOCALSTORAGE} from '../storage/direct';
import auth from '@react-native-firebase/auth';

export default async function apiRegister(data: any) {
  try {
    const url = baseURL.REGISTER_URL;

    const res = await apiHelper(url, data);
    // console.log('res:>>', res);

    switch (res?.code) {
      case NETWORK.SUCCESS:
        //store user data
        storeData(LOCALSTORAGE.apikey, res?.data?.apiKey);
        storeData(LOCALSTORAGE.user, res?.data);

        if (res?.data.message == 'success') {
          // sign in firebase auth
          auth()
            .signInWithCustomToken(res?.data.firebaseToken)
            .then(res => {})
            .catch(err => {
              console.warn(
                'API LOGIN - SIGN IN WITH CUSTOM TOKEN ERROR >> : ',
                err,
              );
            });
        }

        return Promise.resolve(res?.data);
      case NETWORK.ERROR:
        return Promise.reject(res?.message);
    }
  } catch (error) {
    throw error;
  }
}
