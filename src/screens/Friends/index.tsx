import React, { useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text
} from 'react-native';
import styles from './styes';
import mainTheme from '../../assets/colors';
import Header from '../../components/Header';
import CardRequest from '../../components/CardRequest';
import CardFriends from '../../components/CardFriends';
import firestore from '@react-native-firebase/firestore'
import axios from 'axios';
import { apikey } from '../LoginScreen';

firestore().useEmulator('localhost', 8080)

const dataFriends = [
    {
        id: 1,
        name: 'Thanh Thuan',
        image: 'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
        status: true
    },
    {
        id: 2,
        name: 'Thanh Thuan',
        image: 'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
        status: true
    },
    {
        id: 3,
        name: 'Thanh Thuan',
        image: 'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
        status: false
    },
    {
        id: 4,
        name: 'Thanh Thuan',
        image: 'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
        status: true
    },
    {
        id: 5,
        name: 'Thanh Thuan',
        image: 'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
        status: false
    },
]

const dataRequest = [
    {
        id: 1,
        name: 'Nghia Pham',
        image: 'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
    },
    {
        id: 2,
        name: 'Nghia Pham',
        image: 'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
    },
]

const Friends = () => {
    firestore().collection('users').get().then((response: any) => console.log(response.docs))


    const FetchGetFriendList = async () => {
        try {
            return await axios.post('http://127.0.0.1:5003/api/user/getFriendList', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apikey
                },
                timeout: 20000
            }).then((resposne: any) => {
                console.log(resposne.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchGetFriendList()
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar
                animated={true}
                backgroundColor={mainTheme.background}
            />

            <Header
                textLeft='Friends' />

            <Text style={styles.title}>Request</Text>

            {dataRequest?.map((item) => {
                return (
                    <CardRequest
                        key={item?.id}
                        name={item?.name}
                        image={item?.image} />
                )
            })}

            <Text style={styles.title}>Friends</Text>

            <FlatList
                data={dataFriends}
                style={{ marginTop: 16 }}
                renderItem={({ item }) => {
                    return (
                        <CardFriends
                            key={item?.id}
                            name={item?.name}
                            image={item?.image}
                            status={item?.status} />
                    )
                }}
            />

        </SafeAreaView>
    );
};

export default React.memo(Friends);
