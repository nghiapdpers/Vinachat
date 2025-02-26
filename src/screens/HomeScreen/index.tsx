import React, { useEffect, useState } from "react";
import {
  actionClearGroupChat,
  actionListGroupChatStart,
  actionUpdateLatestMessage,
} from "../../redux/actions/listGroupChat";
import firestore from "@react-native-firebase/firestore";
import styles from "./styles";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { screen } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actionFriendListStart } from "../../redux/actions/friendAction";
import useNetworkErr from "../../config/hooks/useNetworkErr";
import lottieHome from "../../assets/lottiefile/home/lottieHome.json";
import lottieLoadingChat from "../../assets/lottiefile/home/lottieLoadingChat.json";
import LottieView from "lottie-react-native";
import { SCREEN, getFirstLetters } from "../../global";
import { RefreshControl } from "react-native";
import mainTheme from "../../assets/colors";
import { DetailGroupChatActions } from "../../redux/actions/getDetailGroupChatActions";
import message from "@react-native-firebase/messaging";

const database = firestore();
const fcm = message();

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const networkErr = useNetworkErr();

  const datafriend = useSelector(
    (state: any) => state?.friendlist?.friendlist?.data?.data
  );
  const loadingFriend = useSelector((state: any) => state?.friendlist?.loading);

  // console.log('loadingFriend:>>', loadingFriend);

  const user = useSelector((state: any) => state.user);
  const ref = useSelector((state: any) => state?.user?.data?.ref);
  const userExternal = useSelector((state: any) => state?.userExternal);
  const list = useSelector((state: any) => state.groupChat?.data);
  const status = useSelector((state: any) => state.groupChat?.status);
  const loadingGroupChat = useSelector(
    (state: any) => state.groupChat?.loading
  );

  const [refreshing, setRefreshing] = useState(false);

  // Refresh
  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(actionClearGroupChat);
    dispatch(actionListGroupChatStart());
    setRefreshing(false);
  };
  // console.log('user:>>', user?.data?.fullname);

  // Khi thành công
  function onResultGroups(QuerySnapshot: any) {
    const groupDataArray: any[] = [];

    QuerySnapshot.forEach((e: any) => {
      const id = e.id; // lấy ra id của document
      const data = e.data();
      data.ref = id; // Thêm thuộc tính id vào data
      groupDataArray.push(data);
    });

    // console.log('groupDataArray:>>', groupDataArray);
    // Nạp dữ liệu lên redux
    dispatch(actionUpdateLatestMessage(groupDataArray));
  }

  // Khi lỗi
  function onErrorGroups(error: any) {
    console.log("Error get realtime:>>", error);
  }

  useEffect(() => {
    const listListener: (() => void)[] = [];

    if (!networkErr) {
      if (status === "done") {
        const listRef = list.map((e: any) => e.ref);

        // console.log('listRef:>>', listRef);

        if (listRef.length > 0) {
          // Fix error limit snapshot of firebase
          for (let i = 0; i < listRef.length; i += 10) {
            const newListRef = listRef.slice(i, i + 10);

            const listener = database
              .collection("groups")
              .where(firestore.FieldPath.documentId(), "in", newListRef)
              .onSnapshot(onResultGroups, onErrorGroups);

            listListener.push(listener);
          }

          // Bắt đầu lắng nghe dữ liệu từ collection "groups"
        } else {
          console.log("ListRef Is Empty");
        }
      }
    }

    return () => {
      listListener.forEach((item) => {
        item();
      });
    };
  }, [status, networkErr]);

  useEffect(() => {
    if (!networkErr) {
      dispatch(actionFriendListStart);
      dispatch(actionListGroupChatStart());
    }
  }, [networkErr]);

  // Gọi api Group Chat
  useEffect(() => {
    let listenGroups: () => void = () => {};
    if (!networkErr) {
      listenGroups = firestore()
        .collection("users")
        .doc(ref)
        .onSnapshot(
          (res) => {
            dispatch(actionListGroupChatStart());
            dispatch(actionFriendListStart);
          },
          (err) => {
            console.log("LISTEN GROUP ERROR >> ", err);
          }
        );
    }

    // unsubcribe group
    return () => {
      listenGroups();
    };
  }, [networkErr, ref]);

  const renderFriendActive = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.viewfriendActive}
        onPress={() => {
          dispatch(DetailGroupChatActions.start(item.groupRef));

          navigation.navigate("MessageScreen", {
            groupRef: item.groupRef,
            total_member: 2,
            groupName: item.fullname,
          });
        }}
      >
        {item.avatar ? (
          <Image
            source={{ uri: item.avatar }}
            style={styles.borderfriendActive}
          />
        ) : (
          <View style={styles.borderfriendActive}>
            <Text>{getFirstLetters(item.fullname)}</Text>
          </View>
        )}
        <Text numberOfLines={1} style={styles.textnameActive}>
          {item.fullname}
        </Text>
      </TouchableOpacity>
    );
  };

  const Flatlistrender = ({ item }: { item: any }) => {
    return item?.latest_message_type ? (
      <TouchableOpacity
        style={styles.BorderMessage}
        onPress={() => {
          dispatch(DetailGroupChatActions.start(item.ref));

          navigation.navigate("MessageScreen", {
            groupRef: item.ref,
            total_member: item.total_member,
            groupName: item.name,
            adminRef: item.adminRef,
            groupAvatar: item.groupAvatar,
          });
        }}
      >
        <View style={styles.MessageAvatar}>
          {item.groupAvatar ? (
            <Image
              source={{ uri: item.groupAvatar }}
              style={styles.borderfriendActive}
            />
          ) : (
            <View style={styles.borderfriendActive}>
              <Text>{getFirstLetters(item.name)}</Text>
            </View>
          )}
        </View>
        <View style={styles.Message}>
          <Text style={styles.textnameMessage}>
            {item.total_member > 2 && (
              <Text style={styles.groupText}>[Nhóm]</Text>
            )}{" "}
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {(user?.data?.fullname || userExternal?.data?.fullname) ===
            item?.latest_message_from_name
              ? item?.latest_message_type === "image"
                ? `You: Hình ảnh`
                : `You: ${item.latest_message_text}`
              : item?.latest_message_type === "image"
              ? `${item.latest_message_from_name}: Hình ảnh`
              : `${item.latest_message_from_name}: ${item.latest_message_text}`}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.BorderMessage}
        onPress={() => {
          dispatch(DetailGroupChatActions.start(item.ref));

          navigation.navigate("MessageScreen", {
            groupRef: item.ref,
            total_member: item.total_member,
            groupName: item.name,
            adminRef: item.adminRef,
            groupAvatar: item.groupAvatar,
          });
        }}
      >
        <View style={styles.MessageAvatar}>
          {item.groupAvatar ? (
            <Image
              source={{ uri: item.groupAvatar }}
              style={styles.borderfriendActive}
            />
          ) : (
            <View style={styles.borderfriendActive}>
              <Text>{getFirstLetters(item.name)}</Text>
            </View>
          )}
        </View>
        <View style={styles.Message}>
          <Text style={styles.textnameMessage}>
            {item.total_member > 2 && (
              <Text style={styles.groupText}>[Nhóm]</Text>
            )}{" "}
            {item.name}
          </Text>
          <Text>
            {item.total_member == 2
              ? ` Bạn vừa kết bạn với ${item?.name}`
              : "Nhóm vừa được tạo ra"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fcmUnsubcribe = fcm.onMessage((message) => {
      const { info, type, scheme }: any = message.data;
      const information = JSON.parse(info);

      console.log(information, type, scheme);

      Linking.openURL(scheme);

      if (type == "CALLING") {
        Linking.openURL(
          `vinachat://calling/${information.type}/${information.status}/${information.name}/${information.groupRef}/${information.callId}/none`
        );
      }
    });

    return () => {
      fcmUnsubcribe();
    };
  }, []);

  // console.log('refreshing:>>', refreshing);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Vinachat</Text>
        <TouchableOpacity
          style={styles.searchBorder}
          onPress={() => {
            navigation.navigate("SearchScreen");
          }}
        >
          <Image style={styles.searchIcon} source={screen.home.search} />
        </TouchableOpacity>
      </View>
      <View style={styles.FriendActive}>
        {loadingFriend === false ? (
          datafriend?.length > 0 ? (
            <FlatList
              data={datafriend}
              renderItem={renderFriendActive}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  loadingFriend === false && <ActivityIndicator size="small" />
                );
              }}
            />
          ) : (
            <LottieView
              source={lottieLoadingChat}
              loop
              autoPlay
              style={{
                width: SCREEN.width * 0.3,
                height: 100,
                alignSelf: "center",
              }}
              speed={1}
            />
          )
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <View style={styles.optionView}>
        <View style={styles.createGroup}>
          <Text style={styles.texttitleMessage}>Message</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateGroupChat");
            }}
          >
            <Image
              style={styles.createGroupIcon}
              source={screen.home.creategroup}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listMessage}>
        {loadingGroupChat === false ? (
          list?.length > 0 ? (
            <FlatList
              data={list}
              renderItem={Flatlistrender}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  loadingGroupChat === false && (
                    <ActivityIndicator
                      size="large"
                      style={{ flex: 1, justifyContent: "center" }}
                    />
                  )
                );
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  colors={[mainTheme.logo]}
                  progressBackgroundColor={mainTheme.background}
                  onRefresh={() => handleRefresh()}
                />
              }
            />
          ) : (
            <LottieView
              source={lottieHome}
              loop
              autoPlay
              style={{
                flex: 1,
                width: SCREEN.width * 0.9,
                height: SCREEN.height * 0.6,
                alignSelf: "center",
                margin: -50,
              }}
              speed={1}
            />
          )
        ) : (
          <ActivityIndicator
            size="large"
            style={{ flex: 1, alignItems: "center" }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
