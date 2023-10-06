import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import styles from './styes';
import mainTheme from '../../assets/colors';
import Header from '../../components/Header2';
import CardRequest from '../../components/CardRequest';
import CardFriends from '../../components/CardFriends';
import {useDispatch, useSelector} from 'react-redux';
import {RequestListActions} from '../../redux/actions/requestListAction';
import apiReplyRequest from '../../apis/apiReplyRequest';

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

const database = firestore();

const Friends = () => {
  const dispatch = useDispatch();

  // get ref from user redux
  const ref = useSelector((s: any) => s.user.data.ref);

  const requestList = useSelector((s: any) => s.requestList.data);
  const requestListLoading = useSelector((s: any) => s.requestList.loading);
  const requestListMessage = useSelector((s: any) => s.requestList.message);

  const requestDebounceRef = useRef<any | number>(null);

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
          clearTimeout(requestDebounceRef.current);

          requestDebounceRef.current = setTimeout(() => {
            dispatch(RequestListActions.start());
          }, 100);
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
    apiReplyRequest({
      ref: ref,
      reply: 'accept',
    });
  };

  // event handler: deny request
  const onDenyRequest = (ref: string) => {
    apiReplyRequest({
      ref: ref,
      reply: 'deny',
    });
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
          requestListLoading ? (
            <ActivityIndicator color={mainTheme.logo} />
          ) : (
            <Text style={styles.requestListEmpty}>
              {!requestListMessage
                ? 'Không có yêu cầu kết bạn mới'
                : requestListMessage}
            </Text>
          )
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
