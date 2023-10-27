import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import styles from './styes';
import mainTheme from '../../assets/colors';
import Header from '../../components/Header2';
import CardRequest from '../../components/CardRequest';
import CardFriends from '../../components/CardFriends';
import apiReplyRequest from '../../apis/apiReplyRequest';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { actionFriendListStart, actionFriendListRefresh } from '../../redux/actions/friendAction';
import { RequestListActions } from '../../redux/actions/requestListAction';
import { actionListGroupChatStart } from '../../redux/actions/listGroupChat';
import { useNavigation } from '@react-navigation/native';

const database = firestore();

const Friends = () => {
  const dispatch = useDispatch();
  // firestore().collection('users').get().then((response: any) => console.log(response.docs))
  const data = useSelector(
    (state: any) => state?.friendlist?.friendlist?.data?.data,
  );
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const FetchGetFriendList = async () => {
    try {
      dispatch(actionFriendListStart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchGetFriendList();
  }, [refreshing]);

  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.textEmpty}>Chưa có bạn bè</Text>
      </View>
    );
  };

  // get ref from user redux
  const ref = useSelector((s: any) => s.user.data?.ref);
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
          console.log('SUBCRIBE REQUEST LIST ERROR >> ', error);
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
    })
      .then(_ => {
        setTimeout(() => {
          dispatch(actionFriendListStart);
          dispatch(actionListGroupChatStart());
        }, 200);
      })
      .catch(err => {
        console.warn('ACCEPT REQUEST ERROR >> ', err);
      });
  };

  // event handler: deny request
  const onDenyRequest = (ref: string) => {
    apiReplyRequest({
      ref: ref,
      reply: 'deny',
    });
  };

  // Refresh Friend List
  const RefreshingFriendList = () => {
    setRefreshing(true);
    dispatch(actionFriendListRefresh);
    dispatch(actionFriendListStart);
    setRefreshing(false);
  }


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
        renderItem={({ item }) => {
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
        data={data}
        style={{ marginTop: 10, flex: 1 }}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={refreshing}
        onRefresh={RefreshingFriendList}
        renderItem={({ item }: { item: any }) => {
          return (
            <CardFriends
              key={item?.id}
              name={item?.fullname}
              image={item?.avatar}
              status={item?.status}
              onPress={() =>
                navigation.navigate('MessageScreen', {
                  groupRef: item.groupRef,
                  total_member: 2,
                  groupName: item.fullname,
                })
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default React.memo(Friends);
