import {storeData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL from './baseURL';
import {LOCALSTORAGE} from '../storage/direct';
import auth from '@react-native-firebase/auth';

export default async function apiLoginWithExternal(data: any) {
  try {
    const url = baseURL.LOGIN_EXTERNAL_URL;

    const res = await apiHelper(url, data);

    console.log('resLoginWithExternal:>>', res);

    switch (res?.code) {
      case NETWORK.SUCCESS:
        storeData(LOCALSTORAGE.userExternal, res?.data);
        // Khi đăng nhập với tài khoản khtest mà dữ liệu
        //trả về là unlinked acccount và không có apiKey
        // thì không lưu apiKey vào Local.
        {
          res?.data?.apiKey
            ? storeData(LOCALSTORAGE.apikey, res?.data?.apiKey)
            : null;
        }

        if (res?.data.message === 'success') {
          // sign in firebase auth
          auth()
            .signInWithCustomToken(res?.data.firebaseToken)
            .then(res => {})
            .catch(err => {
              console.warn(
                'API LOGIN EXTERNAL - SIGN IN WITH CUSTOM TOKEN ERROR >> : ',
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
