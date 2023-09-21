import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { setApiInit } from '../redux/actions'
import store from '../redux/store'
// import store from '../redux/store'
// import { setApiData } from '../redux/actions'

// Tạo form data truyền vào appname
const BODY_DATA_INIT = ({ appName }: { appName: any }) => {
    const data = new FormData()
    data.append("app_name", appName)
    return data
}

// Hàm gọi API để lấy domain và apiKey
export const firstCallAPI = async ({ appName }: { appName: any }) => {
    try {
        // lấy domain và apiKey dưới Local
        let mainDomainLocal = await AsyncStorage.getItem('domain');
        let apiKeyLocal = await AsyncStorage.getItem('apiKey');

        // Gọi API để lấy data
        const res = await axios.post('https://init.sees.vn/appconfig_v2/api/init?apikey=l0913lkjlkLKDKSAPPlCONFIGS', BODY_DATA_INIT({ appName }), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        const mainDomain = res.data.data.main_domain;
        const apiKey = res.data.data.apikey;
        const data = res.data;
        // Khi không có domain hoặc domain khác so với domain dưới Local
        if (!mainDomainLocal || !apiKeyLocal || mainDomainLocal != mainDomain) {
            // Update lại domain và apiKey
            mainDomainLocal = await AsyncStorage.setItem('domain', mainDomain);
            apiKeyLocal = await AsyncStorage.setItem('apiKey', apiKey);
        }

        console.log(data);

        store.dispatch(setApiInit(data))
        return data;
    } catch (error) {
        console.log('Error :>> ', JSON.stringify(error));
    }
};