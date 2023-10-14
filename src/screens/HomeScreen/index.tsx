import React, { useEffect } from 'react';
import { actionListGroupChatStart, actionUpdateLatestMessage } from "../../redux/actions/listGroupChat";
import firestore from "@react-native-firebase/firestore";
import styles from './styles';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { screen } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { actionFriendListStart } from '../../redux/actions/friendAction';

const database = firestore();

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const datafriend = useSelector(
    (state: any) => state?.friendlist?.friendlist?.data?.data,
  );

  const user = useSelector((state: any) => state.user);
  const userExternal = useSelector((state: any) => state?.userExternal);
  const list = useSelector((state: any) => state.groupChat?.data);
  const status = useSelector((state: any) => state.groupChat?.status);


  console.log('user:>>', user?.data?.fullname);


  useEffect(() => {
    console.log('list:>>', list);
  }, [list]);

  // Khi thành công
  function onResultGroups(QuerySnapshot: any) {
    const groupDataArray: any[] = [];

    QuerySnapshot.forEach((e: any) => {
      const id = e.id; // lấy ra id của document
      const data = e.data();
      data.ref = id; // Thêm thuộc tính id vào data
      groupDataArray.push(data);
    });

    console.log('groupDataArray:>>', groupDataArray);
    // Nạp dữ liệu lên redux
    dispatch(actionUpdateLatestMessage(groupDataArray));
  }

  useEffect(() => {
    dispatch(actionFriendListStart);
  }, []);

  // Gọi api Group Chat
  useEffect(() => {
    dispatch(actionListGroupChatStart());
  }, []);


  // Khi lỗi
  function onErrorGroups(error: any) {
    console.log('Error get realtime:>>', error);
  }

  useEffect(() => {

    if (status === 'done') {

      const listRef = list.map((e: any) => e.ref);

      console.log('listRef:>>', listRef);

      if (listRef.length > 0) {
        // Bắt đầu lắng nghe dữ liệu từ collection "groups"
        database.collection('groups')
          .where(firestore.FieldPath.documentId(), 'in', listRef)
          .onSnapshot(onResultGroups, onErrorGroups);
      } else {
        console.log("ListRef Is Empty");
      }
    }

  }, [status]);

  useEffect(() => {
    dispatch(actionFriendListStart);
  }, []);

  // Gọi api Group Chat
  useEffect(() => {
    dispatch(actionListGroupChatStart())
  }, [])

  const getFirstLetters = (inputString: any) => {
    const words = inputString.trim().split(' ');
    if (words.length === 0) {
      return ''; // Chuỗi rỗng
    } else if (words.length === 1) {
      const firstLetter = words[0].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ đầu tiên và chuyển thành chữ hoa
      return firstLetter + firstLetter; // Lặp lại chữ cái đầu tiên 2 lần
    } else {
      const firstLetter = words[0].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ đầu tiên và chuyển thành chữ hoa
      const lastLetter = words[words.length - 1].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ cuối cùng và chuyển thành chữ hoa
      return firstLetter + lastLetter; // Kết hợp chữ cái đầu tiên của từ đầu tiên và từ cuối cùng
    }
  };

  const renderFriendActive = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.viewfriendActive}
        onPress={() => {
          navigation.navigate('MessageScreen', { ref: String(item.ref) });
        }}>
        <View style={styles.borderfriendActive}>
          <Text>{getFirstLetters(item.fullname)}</Text>
        </View>
        <Text numberOfLines={1} style={styles.textnameActive}>{item.fullname}</Text>
      </TouchableOpacity>
    );
  };

  const Flatlistrender = ({ item }: { item: any }) => {
    console.log((user?.data?.fullname || userExternal?.data?.fullname) === item?.latest_message_from_name && item?.latest_message_type === 'image');

    return (
      item?.latest_message_type ? (
        <TouchableOpacity
          style={styles.BorderMessage}
          onPress={() => {
            navigation.navigate('MessageScreen', {
              groupRef: item.ref,
              total_member: item.total_member,
              groupName: item.name,
            });
          }}>
          <View style={styles.MessageAvatar}>
            <View style={styles.borderfriendActive}>
              <Text>{getFirstLetters(item.name)}</Text>
            </View>
          </View>
          <View style={styles.Message}>
            <Text style={styles.textnameMessage}>{item.name}</Text>
            <Text>
              {
                (user?.data?.fullname || userExternal?.data?.fullname) === item?.latest_message_from_name
                  ? (
                    item?.latest_message_type === 'image'
                      ? `You: Hình ảnh`
                      : `You: ${item.latest_message_text}`
                  )
                  : (
                    item?.latest_message_type === 'image'
                      ? `${item.latest_message_from_name}: Hình ảnh`
                      : `${item.latest_message_from_name}: ${item.latest_message_text}`
                  )
              }
            </Text>
          </View>
        </TouchableOpacity>
      ) :
        (
          <TouchableOpacity
            style={styles.BorderMessage}
            onPress={() => {
              navigation.navigate('MessageScreen', {
                groupRef: item.ref,
                total_member: item.total_member,
                groupName: item.name,
              });
            }}>
            <View style={styles.MessageAvatar}>
              <View style={styles.borderfriendActive}>
                <Text>{getFirstLetters(item.name)}</Text>
              </View>
            </View>
            <View style={styles.Message}>
              <Text style={styles.textnameMessage}>{item.name}</Text>
              <Text>
                Bạn vừa kết bạn với {item?.name}
              </Text>
            </View>
          </TouchableOpacity>
        )
    )

  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Vinachat</Text>
        <TouchableOpacity
          style={styles.searchBorder}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <Image style={styles.searchIcon} source={screen.home.search} />
        </TouchableOpacity>
      </View>
      <View style={styles.FriendActive}>
        <FlatList
          data={datafriend}
          renderItem={renderFriendActive}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.optionView}>
        <View style={styles.createGroup}>
          <Text style={styles.texttitleMessage}>Message</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateGroupChat');
            }}>
            <Image
              style={styles.createGroupIcon}
              source={screen.home.creategroup}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listMessage}>
        <FlatList
          data={list}
          renderItem={Flatlistrender}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
