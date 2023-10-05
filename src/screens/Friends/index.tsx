import React, {useEffect, useState, useRef} from 'react';
import {FlatList, SafeAreaView, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import styles from './styes';
import mainTheme from '../../assets/colors';
import Header from '../../components/Header2';
import CardRequest from '../../components/CardRequest';
import CardFriends from '../../components/CardFriends';

const dataFriends = [
  {
    id: 1,
    name: 'Thanh Thuan',
    image:
      'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
    status: true,
  },
  {
    id: 2,
    name: 'Thanh Thuan',
    image:
      'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
    status: true,
  },
  {
    id: 3,
    name: 'Thanh Thuan',
    image:
      'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
    status: false,
  },
  {
    id: 4,
    name: 'Thanh Thuan',
    image:
      'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
    status: true,
  },
  {
    id: 5,
    name: 'Thanh Thuan',
    image:
      'https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg',
    status: false,
  },
];

const dataRequest = [
  {
    id: 1,
    name: 'Nghia Pham',
    image:
      'https://assets.dryicons.com/uploads/icon/preview/7805/icon_grid_1x_39f0ea11-1cfa-4903-8c39-221b37318018.png',
  },
  {
    id: 2,
    name: 'Nghia Pham',
    image:
      'https://assets.dryicons.com/uploads/icon/preview/7805/icon_grid_1x_39f0ea11-1cfa-4903-8c39-221b37318018.png',
  },
  {
    id: 3,
    name: 'Nghia Pham',
    image:
      'https://assets.dryicons.com/uploads/icon/preview/7805/icon_grid_1x_39f0ea11-1cfa-4903-8c39-221b37318018.png',
  },
];

const database = firestore();
const api =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiIxVkxhVldrRENUR0h5M1VKUFh4ayIsImlhdCI6MTY5NjQwOTI0MywiZXhwIjoxNjk2NDEyODQzfQ.-opg6WUqymSwWcsoTEsxkUrP0Wm6x0Tqu4XjsF4Coqk';
const ref = '1VLaVWkDCTGHy3UJPXxk';

const Friends = () => {
  const [requestList, setRequestList] = useState<any[]>([]);

  const fetchRef = useRef<any>(null);

  // fetch data example
  const fetchdata = () => {
    clearTimeout(fetchRef.current);

    fetchRef.current = setTimeout(async () => {
      const data = await fetchRequest(api);

      if (data.message === 'success') {
        setRequestList(data.data);
      } else {
        console.warn(data.message);
      }
    }, 100);
  };

  // side effect: subcribe to listen realtime change from firestore
  useEffect(() => {
    // listen every change from firestore
    const subcribeRequestList = database
      .collection('users')
      .doc(ref)
      .collection('relationship')
      .where('status', '==', 'RC')
      .onSnapshot(
        snapshot => {
          fetchdata();
        },
        error => {
          console.warn('SUBCRIBE REQUEST LIST ERROR >> ', error);
        },
      );

    // unsubcribe when this component unmount
    return () => {
      subcribeRequestList();
    };
  }, []);

  // event handler: accept request
  const onAcceptRequest = (ref: string) => {
    replyRequest(api, 'accept', ref);
  };

  // event handler: deny request
  const onDenyRequest = (ref: string) => {
    replyRequest(api, 'deny', ref);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header textLeft="Friends" />

      <Text style={styles.title}>Request</Text>

      <FlatList
        data={requestList}
        style={{
          flex: 1,
          maxHeight: requestList.length > 0 ? 150 * requestList.length : 25,
        }}
        contentContainerStyle={styles.requestContentList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <CardRequest
              name={item.fullname}
              image={
                item?.avatar
                  ? item.avatar
                  : 'https://assets.dryicons.com/uploads/icon/preview/7805/icon_grid_1x_39f0ea11-1cfa-4903-8c39-221b37318018.png'
              }
              onAccept={() => onAcceptRequest(item.ref)}
              onDeny={() => onDenyRequest(item.ref)}
            />
          );
        }}
        ListEmptyComponent={
          <Text style={styles.requestListEmpty}>
            Không có yêu cầu kết bạn mới
          </Text>
        }
        keyExtractor={item => item.ref}
      />

      <View style={styles.line} />

      <Text style={styles.title}>Friends</Text>

      <FlatList
        data={dataFriends}
        style={{marginTop: 16, flex: 1}}
        renderItem={({item}) => {
          return (
            <CardFriends
              key={item?.id}
              name={item?.name}
              image={item?.image}
              status={item?.status}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default React.memo(Friends);

const fetchRequest = async (api: string) => {
  try {
    const result = await fetch('http://10.0.2.2:5000/api/user/getRequestList', {
      headers: {
        ['Authorization']: 'Bearer ' + api,
      },
      method: 'POST',
    });

    return result.json();
  } catch (error) {
    console.log('FETCH REQUEST ERROR >> ', error);
  }
};

const replyRequest = async (
  api: string,
  reply: 'accept' | 'deny',
  ref: string,
) => {
  try {
    const result = await fetch('http://10.0.2.2:5000/api/user/replyRequest', {
      headers: {
        ['Authorization']: 'Bearer ' + api,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        ref: ref,
        reply: reply,
      }),
    });

    return result.json();
  } catch (error) {
    console.log('REPLY ERROR >> ', error);
  }
};

{
  /* <Text style={styles.title}>Request</Text>

      {requestList?.map((item: any) => {
        return (
          <CardRequest
            key={item?.ref}
            name={item?.fullname}
            image={
              item?.avatar
                ? item.avatar
                : 'https://assets.dryicons.com/uploads/icon/preview/7805/icon_grid_1x_39f0ea11-1cfa-4903-8c39-221b37318018.png'
            }
          />
        );
      })} */
}
