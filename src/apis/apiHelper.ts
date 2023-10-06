import axios, {AxiosError} from 'axios';
import {NoInternetError} from '../components/NetworkError/NoInternetError';
import {TimeoutError} from '../components/NetworkError/TimeoutError';

export enum NETWORK {
  SUCCESS,
  ERROR,
}

export default async function apiHelper(
  url: string,
  data: any,
  apiKey?: string,
) {
  return await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
      timeout: 20000,
    })
    .then(res => {
      if (res.status === 200) {
        switch (res.data.message) {
          case 'success':
            return {
              data: res.data,
              code: NETWORK.SUCCESS,
            };
          case 'unlinked account':
            return {
              data: res.data,
              code: NETWORK.SUCCESS,
            };
          default:
            return {
              message: res.data,
              code: NETWORK.ERROR,
            };
        }
      }
    })
    .catch((err: AxiosError) => {
      if (
        err.code === AxiosError.ECONNABORTED &&
        err.message.includes('timeout')
      ) {
        throw new TimeoutError('Lỗi kết nối, đang thử lại...');
      }

      if (err.code === AxiosError.ERR_NETWORK) {
        throw new NoInternetError('Vấn đề về kết nối internet...');
      }
    });
}
