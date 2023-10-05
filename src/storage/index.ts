import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Callback,
    CallbackWithResult,
    KeyValuePair,
    MultiCallback,
    MultiGetCallback,
} from '@react-native-async-storage/async-storage/lib/typescript/types';

//Store single data (accept object or string)
export async function storeData(
    name: string,
    data: string | object,
    cb?: Callback,
) {
    try {
        if (typeof data === 'object') data = JSON.stringify(data);
        AsyncStorage.setItem(name, data, cb);
    } catch (error) {
        console.error('STORAGE ERROR - WHEN SAVING ', name, ' TO LOCAL. \n', error);
    }
}

//Get single data (object or string)
export async function getData(name: string, cb?: CallbackWithResult<string>) {
    try {
        const ob = await AsyncStorage.getItem(name, cb);
        return ob != null
            ? ob?.startsWith('{') && ob?.endsWith('}')
                ? JSON.parse(ob)
                : ob
            : null;
    } catch (error) {
        console.error(
            'STORAGE ERROR - WHEN READING ',
            name,
            ' FROM LOCAL. \n',
            error,
        );
    }
}

// Remove single data
export async function removeData(name: string, cb?: Callback) {
    try {
        await AsyncStorage.removeItem(name, cb);
    } catch (error) {
        console.error(
            'STORAGE ERROR - WHEN READING ',
            name,
            ' FROM LOCAL. \n',
            error,
        );
    }
}

//Multi store data (accept only string)
export async function multiStoreData(
    data: [string, string][],
    cb?: MultiCallback,
) {
    try {
        AsyncStorage.multiSet(data, cb);
    } catch (error) {
        console.error(
            'STORAGE ERROR - WHEN mSAVING ',
            data,
            ' TO LOCAL. \n',
            error,
        );
    }
}

//Multi get data (only string)
export async function multiGetData(name: string[], cb?: MultiGetCallback) {
    try {
        const ob = await AsyncStorage.multiGet(name, cb);
        return ob != null ? ob : null;
    } catch (error) {
        console.error(
            'STORAGE ERROR - mWHEN READING ',
            name,
            ' FROM LOCAL. \n',
            error,
        );
    }
}

export async function multiRemoveData(name: string[], cb?: MultiCallback) {
    try {
        await AsyncStorage.multiRemove(name, cb);
    } catch (error) {
        throw new Error(
            'STORAGE ERROR - WHEN mREMOVE ' + name + ' FROM LOCAL \n' + error,
        );
    }
}