import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    View
} from 'react-native';
import styles from './styes';
import mainTheme from '../../assets/colors';
import Header from '../../components/Header';
import CardRequest from '../../components/CardRequest';
import CardFriends from '../../components/CardFriends';
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { actionFriendListStart } from '../../redux/actions/friendAction';

// firestore().useEmulator('localhost', 8080)

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
    const dispatch = useDispatch();
    // firestore().collection('users').get().then((response: any) => console.log(response.docs))
    const data = useSelector((state: any) => state?.friendlist?.friendlist?.data?.data)



    const FetchGetFriendList = async () => {
        try {
            dispatch(actionFriendListStart)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchGetFriendList()
    }, [])

    const ListEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.textEmpty}>Chưa có bạn bè</Text>
            </View>
        )
    }

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
                data={data}
                style={{ marginTop: 10 }}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={({ item }: { item: any }) => {
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
