import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';
import images, {component, screen} from '../../assets/images';
import GroupChat from '../../realm/GroupChat';
import {useRealm} from '@realm/react';
import Message from '../../realm/Message';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import Header from '../../components/Header';
import styles from './styles';
import mainTheme from '../../assets/colors';
import MoreMessageOptions from '../../components/MoreMessageOptions';
import {Image as ImageAsset} from 'react-native-image-crop-picker';
import {useCameraPermission} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';
import {listChatActions} from '../../redux/actions/listChatActions';
import {useNavigation, useRoute} from '@react-navigation/native';
import LoadingOverlay from '../../components/LoadingOverlay';
import apiHelper from '../../apis/apiHelper';
import apiSynchronous from '../../apis/apiSynchronous';
// import EmojiBoard from 'react-native-emoji-board';
import useNetworkErr from '../../config/hooks/useNetworkErr';
import apiUpdateLatestMessage from '../../apis/apiUpdateLatestMessage';
import {DetailGroupChatActions} from '../../redux/actions/getDetailGroupChatActions';
import {SCREEN, getFirstLetters, parseSecondsToTime} from '../../global';

var groupJson = require('unicode-emoji-json/data-by-group.json');
import {CallActions, useCallDispatch} from '../Call/context';

// Màn hình chat:
/**
 * Chức năng chat nay được viết trực tiếp bằng firestore đảm bảo sự nhanh chóng (k phải thông qua api như cũ.). Điều này yêu cầu một số cài đặt ở server về phần login và cài đặt ở client.
 *
 * Mục tiêu của app: Nhanh, nhẹ. Các hoạt động realtime sẽ phải nhanh nhất có thê, vì thế hầu hết các chức năng không cần đến realtime hoặc tiêu tốn nhiều thời gian xử lý (filter hàng ngàn user để lọc ra bạn bè...) sẽ được server xử lý và trả về thông tin thông qua API. Đồng thời đảm bảo các logic đăng nhập, đăng ký... và cấu trúc dữ liệu được an toàn.
 *
 * Chức năng loadmore: mỗi khi kéo lên tới tận cùng tin nhắn mới nhất, gọi api để cập nhật thêm 20 các tin nhắn tiếp theo (không lưu vào realm - realm sẽ gọi api để đồng bộ tin nhắn mỗi khi vào màn hình screen, và real sẽ cập nhật khi có tin nhắn mới). Nếu mất mạng, sẽ sử dụng realm để hiển thị.
 *
 * Lần đầu vào màn hình Message: gọi api để đồng bộ tin nhắn từ firestore với realm. Nghĩa là sẽ lấy ref tin nhắn cuối cùng được lưu trong realm, sau đó gọi api để đồng bộ tin nhắn từ firestore và lưu vào realm. Chức năng hiển thị không thay đổi.
 *
 */

const database = firestore();

export default function MessageScreen() {
  const {hasPermission, requestPermission} = useCameraPermission();

  const networkErr = useNetworkErr();

  const route = useRoute();
  const navigation = useNavigation();

  const {groupRef, total_member, groupName, adminRef, groupAvatar}: any =
    route.params;

  const callDispatch = useCallDispatch();

  const dispatch = useDispatch();
  const ref = useSelector((s: any) => s.user.data.ref);
  const myName = useSelector((s: any) => s.user.data.fullname);
  const detailGroupName = useSelector((s: any) => s.detailGroup.name);
  const detailGroupAvatar = useSelector((s: any) => s.detailGroup.groupAvatar);

  const detailGroupLoading = useSelector((s: any) => s.detailGroup.loading);
  const listChatData = useSelector((s: any) => s.listChat.data);
  const loadmore = useSelector((s: any) => s.listChat.lmLoading);
  const totalMessage = useSelector((s: any) => s.listChat.lmTotal);
  const currentMessage = useSelector((s: any) => s.listChat.lmCurrent);
  const currentOfflineRef = useRef(0);
  const [isSend, setIsSend] = useState(false);
  const [imagesData, setImagesData] = useState<ImageAsset[]>([]);
  const [moreOptVisible, setMoreOptVisible] = useState(false);
  const [emoPicker, setEmoPicker] = useState(false);
  const [value, setValue] = useState('');
  const [keyboard, setKeyboard] = useState(false);
  const listRef = useRef<any | FlatList>(null);
  const realm = useRealm();
  const [isReady, setIsReady] = useState(false);
  const [selectedCategoryEmoji, setSelectedCategoryEmoji] =
    useState('Smileys & Emotion');

  const itemsPerRow = Platform.OS === 'android' ? 11 : 10; // Số emoji trên mỗi hàng

  // side effect: subcribe to listen chat
  useEffect(() => {
    // ignore initial listen
    let notFirstRender = false;
    let listenMessage: () => void = () => {};

    if (!networkErr) {
      listenMessage = database
        .collection('groups')
        .doc(groupRef)
        .collection('messages')
        .orderBy('sent_time', 'desc')
        .limit(20)
        .onSnapshot(
          snapshot => {
            if (notFirstRender) {
              snapshot.docChanges().forEach(item => {
                if (item.doc.get('from') === ref) {
                  if (item.type === 'modified') {
                    dispatch(
                      listChatActions.add({
                        ...item.doc.data(),
                        ref: item.doc.id,
                        status: 'sended',
                        from_name: item.doc.data().from_name,
                      }),
                    );

                    realm.write(() => {
                      let groupChat: GroupChat = realm
                        .objects<GroupChat>('GroupChat')
                        .filtered(`ref = '${groupRef}'`)[0];

                      const newMessage = {
                        ref: item.doc.id,
                        status: 'sended',
                        call_status: 'dead',
                        end_call_reason: item.doc.data().end_call_reason,
                        from: item.doc.data().from,
                        from_name: item.doc.data().from_name,
                        message: item.doc.data().message,
                        sent_time: item.doc.data().sent_time.seconds,
                        type: item.doc.data().type,
                        call_time: item.doc.data().call_time,
                        images: item.doc.data().images
                          ? item.doc
                              .data()
                              .images.map((url: any) => ({url: url}))
                          : [],
                      };

                      const isExist = groupChat.messages.findIndex(
                        (object: any) => object.ref == item.doc.id,
                      );

                      if (isExist != -1) {
                        console.log(
                          'message is exist',
                          groupChat.messages[isExist],
                        );
                        // --- update message is exist in here:
                        // groupChat.messages[isExist]
                      } else {
                        groupChat.messages.push(newMessage);
                      }
                    });
                  }
                } else {
                  if (item.type === 'added') {
                    dispatch(
                      listChatActions.add({
                        ...item.doc.data(),
                        ref: item.doc.id,
                        status: 'sended',
                        from_name: item.doc.data().from_name,
                      }),
                    );

                    realm.write(() => {
                      let groupChat: GroupChat = realm
                        .objects<GroupChat>('GroupChat')
                        .filtered(`ref = '${groupRef}'`)[0];

                      const newMessage = {
                        ref: item.doc.id,
                        status: 'sended',
                        call_status: item.doc.data().call_status,
                        end_call_reason: item.doc.data().end_call_reason,
                        from: item.doc.data().from,
                        from_name: item.doc.data().from_name,
                        message: item.doc.data().message,
                        sent_time: item.doc.data().sent_time.seconds,
                        type: item.doc.data().type,
                        // call_time: item.doc.data().call_time.seconds,
                        images: item.doc.data().images
                          ? item.doc
                              .data()
                              .images.map((url: any) => ({url: url}))
                          : [],
                      };
                      groupChat.messages.push(newMessage);
                    });
                  }
                }
              });
            } else {
              dispatch(
                listChatActions.merge(
                  snapshot.docs.map(item => ({
                    ...item.data(),
                    ref: item.id,
                    status: 'sended',
                    from_name: item.data().from_name,
                  })),
                ),
              );
            }
            notFirstRender = true;
            setIsReady(true);
          },
          err => {
            console.warn(
              ':::: MESSAGE SCREEN / LISTEN MESSAGE ERROR ::::N',
              err,
            );
          },
        );
    } else {
      setIsReady(true);
    }

    // unsubcribe firestore chat group
    return () => {
      dispatch(listChatActions.clear());
      listenMessage();
    };
  }, [networkErr]);

  const renderItem = ({item, index}: any) => {
    const messageFromMe = item.from === ref;

    const lastMessageSameFrom = listChatData[index + 1]?.from === item.from;

    return (
      <Pressable
        onPress={() => {
          handleCloseEmoji();
          handleCloseMoreOpt();
          Keyboard.dismiss();
        }}
        style={[
          styles.messageContainer,
          {marginTop: lastMessageSameFrom ? 0 : 18},
        ]}>
        {!messageFromMe && total_member > 2 && !lastMessageSameFrom && (
          <Text style={[styles.messageFromName]}>{item.from_name}</Text>
        )}

        {item.message.length > 0 && (
          <>
            {item.type.includes('call') ? (
              <>
                <View
                  style={[
                    {
                      alignSelf: messageFromMe ? 'flex-end' : 'flex-start',
                      backgroundColor: messageFromMe
                        ? mainTheme.lowerFillLogo
                        : mainTheme.white,
                    },
                    styles.callMessage,
                  ]}>
                  <Image
                    source={
                      messageFromMe
                        ? images.screen.message.outcoming_call
                        : images.screen.message.incoming_call
                    }
                    style={styles.callMessageIcon}
                  />
                  <View style={styles.callMessageTextView}>
                    <Text style={styles.callMessageTitle}>{item.message}</Text>
                    <Text style={styles.callMessageReason}>
                      {item.end_call_reason}
                    </Text>
                    <Text style={styles.callMessageTime}>
                      {item.call_time > 0
                        ? parseSecondsToTime(item.call_time)
                        : ''}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleCalling(
                      item.type == 'voicecall' ? 'voicecall' : 'videocall',
                    );
                  }}
                  style={[
                    {
                      alignSelf: messageFromMe ? 'flex-end' : 'flex-start',
                      backgroundColor: messageFromMe
                        ? mainTheme.white
                        : mainTheme.lowerFillLogo,
                    },
                    styles.recallButton,
                  ]}>
                  <Text style={styles.recallText}>Gọi lại</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {Platform.OS === 'android' ? (
                  <Text
                    style={[
                      styles.borderMessageAndroid,
                      {
                        alignSelf: messageFromMe ? 'flex-end' : 'flex-start',
                        backgroundColor: messageFromMe
                          ? mainTheme.lowerFillLogo
                          : mainTheme.white,
                      },
                    ]}>
                    {item.message}
                  </Text>
                ) : (
                  <View
                    style={[
                      styles.borderMessageIos,
                      {
                        alignSelf: messageFromMe ? 'flex-end' : 'flex-start',
                        backgroundColor: messageFromMe
                          ? mainTheme.lowerFillLogo
                          : mainTheme.white,
                      },
                    ]}>
                    <Text style={styles.textMessage}>{item.message}</Text>
                  </View>
                )}
              </>
            )}
          </>
        )}

        {item.images && item.images.length > 0 && (
          <>
            {item.images.map((image: any, index: number) => (
              <View
                key={image + index}
                style={[
                  styles.imageMessage,
                  messageFromMe
                    ? {alignSelf: 'flex-end', marginRight: 10}
                    : {alignSelf: 'flex-start', marginLeft: 10},
                ]}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('DetailImageScreen', {
                      imageSource: image,
                    })
                  }>
                  <Image
                    source={
                      image == 'dang-tai-anh-len-server'
                        ? images.screen.message.loading
                        : {uri: image}
                    }
                    style={
                      image == 'dang-tai-anh-len-server'
                        ? {width: 64, height: 64, alignSelf: 'center'}
                        : {width: '100%', height: '100%', borderRadius: 10}
                    }
                  />
                </Pressable>
              </View>
            ))}
          </>
        )}

        {messageFromMe && index == 0 && (
          <Text style={styles.messageStatus}>
            {item.status == 'sending' ? 'Đang gửi' : 'Đã gửi'}
          </Text>
        )}
      </Pressable>
    );
  };

  // Lưu trữ tất cả tin nhắn vào Realm kể từ tin nhắn cuối cùng khi thoát app
  const getMessageLastest = async () => {
    let getMessageLatest = realm
      .objects('GroupChat')
      .filtered(`ref = '${groupRef}'`)[0];
    const messages: any = getMessageLatest?.messages;
    const latestMessage = messages?.sorted('sent_time', true)[0];
    // console.log('Reposne', latestMessage?.ref);
    // console.log(messages);

    // if had no internet, get message from realm
    if (networkErr) {
      let messageObject = realm
        .objects('GroupChat')
        .filtered(`ref = '${groupRef}'`)[0];
      const messages: any = messageObject?.messages;
      const sortMessages = messages?.sorted('sent_time', true);

      dispatch(
        listChatActions.merge(
          sortMessages?.slice(
            currentOfflineRef.current,
            currentOfflineRef.current + 20,
          ),
        ),
      );
    }

    await apiSynchronous({
      group_ref: groupRef,
      last_chat_ref: latestMessage?.ref,
    })
      .then((response: any) => {
        realm.write(() => {
          if (!getMessageLatest) {
            getMessageLatest = realm.create<GroupChat>('GroupChat', {
              ref: groupRef,
              name: '',
              total_member: 0,
              adminRef: '',
              latest_message_from: '',
              latest_message_from_name: '',
              latest_message_text: '',
              latest_message_type: '',
              latest_message_sent_time: 0,
              member: [],
              messages: [],
            });
          }

          response.data.map((item: any) => {
            const newMessage = {
              ref: item.ref,
              call_status: 'dead',
              end_call_reason: item.end_call_reason ? item.end_call_reason : '',
              from: item.from,
              from_name: item.from_name,
              message: item.message,
              sent_time: item.sent_time._seconds,
              type: item.type,
              call_time: item?.call_time ? item.call_time : 0,
              images: item.images
                ? item.images.map((url: any) => ({url: url}))
                : [],
            };

            getMessageLatest.messages.push(newMessage);
          });
        });
      })
      .catch(err => {
        console.log(
          ':::: MESSAGE SCREEEN / API-GET-LATEST-MESSAGE ERROR >> ::::\n',
          err,
        );
      });
  };

  useEffect(() => {
    getMessageLastest();

    return () => {
      dispatch(DetailGroupChatActions.clear());
    };
  }, []);

  // event handler: open emoji picker
  const handleOpenEmoji = useCallback(() => {
    setEmoPicker(prev => !prev);
    setMoreOptVisible(false);
    Keyboard.dismiss();
  }, []);

  // event handler: close emoji picker
  const handleCloseEmoji = useCallback(() => {
    setEmoPicker(false);
  }, []);

  // event handler: open more options
  const handleOpenMoreOpt = useCallback(async () => {
    if (!hasPermission) {
      await requestPermission();
    }

    setMoreOptVisible(true);
    setEmoPicker(false);
    Keyboard.dismiss();
  }, []);

  // event handler: close more options
  const handleCloseMoreOpt = useCallback(() => {
    setMoreOptVisible(false);
  }, []);

  Keyboard.addListener('keyboardDidShow', () => {
    handleCloseEmoji();
    handleCloseMoreOpt();
    setKeyboard(true);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboard(false);
  });

  // event handler: send message
  const handleSendMessage = async () => {
    if (value.length > 0 || imagesData.length > 0) {
      try {
        // create message ref
        const messageRef = firestore()
          .collection('groups')
          .doc(groupRef)
          .collection('messages')
          .doc().id;

        // timestamp
        const serverTime = firestore.FieldValue.serverTimestamp();

        if (imagesData.length == 0) {
          // save to redux
          dispatch(
            listChatActions.add({
              ref: messageRef,
              from: ref,
              message: value,
              sent_time: '',
              status: 'sending',
              type: 'text',
              from_name: myName,
            }),
          );
        } else {
          // save to redux
          dispatch(
            listChatActions.add({
              ref: messageRef,
              from: ref,
              message: value,
              sent_time: '',
              status: 'sending',
              type: 'image',
              from_name: myName,
              images: new Array(imagesData.length).fill(
                'dang-tai-anh-len-server',
              ),
            }),
          );
        }

        setValue('');
        listRef.current.scrollToOffset({animated: true, offset: 0});

        if (imagesData.length == 0) {
          // write to firestore
          await firestore()
            .collection('groups')
            .doc(groupRef)
            .collection('messages')
            .doc(messageRef)
            .set({
              from: ref,
              message: value,
              sent_time: serverTime,
              type: 'text',
              from_name: myName,
            });
        } else {
          const imagesPromise = imagesData.map(async (item: ImageAsset) => {
            // cut filename from path
            const splitPath = item.path.split('/');
            const fileName = splitPath[splitPath.length - 1];

            const ref = storage().ref(`/groups/${groupRef}/${fileName}`);
            await ref.putFile(item.path);
            return ref.getDownloadURL();
          });

          const images = await Promise.all(imagesPromise);

          // write to firestore
          await firestore()
            .collection('groups')
            .doc(groupRef)
            .collection('messages')
            .doc(messageRef)
            .set({
              from: ref,
              message: value,
              sent_time: serverTime,
              type: 'image',
              from_name: myName,
              images,
            });
        }

        // for production
        await apiUpdateLatestMessage({
          group_ref: groupRef,
          message_ref: messageRef,
        })
          .then(res => {
            // console.log('update latest message', res);
          })
          .catch(err => {
            console.log(':::: UPDATE-LATEST-MESSAGE ERROR :::: >>\n', err);
          });

        setIsSend(!isSend);
      } catch (error) {
        console.log('SEND MESSAGE ERROR >> ', error);
      }
    }
    // const now = firestore.Timestamp.fromDate(new Date());
    // const now = new Date();

    // console.log(value, '::::', now.toUTCString());
  };

  // event handler: loadmore
  const handleLoadmore = () => {
    if (
      currentMessage < totalMessage &&
      listChatData?.length >= 20 &&
      !networkErr
    ) {
      dispatch(
        listChatActions.loadmore_start(
          groupRef,
          listChatData[listChatData?.length - 1].ref,
        ),
      );
    }

    if (networkErr) {
      currentOfflineRef.current = currentOfflineRef.current + 20;

      let messageObject = realm
        .objects('GroupChat')
        .filtered(`ref = '${groupRef}'`)[0];
      const messages: any = messageObject?.messages;
      const sortMessages = messages?.sorted('sent_time', true);
      dispatch(
        listChatActions.loadmore_end({
          data: {
            chats: sortMessages?.slice(
              currentOfflineRef.current,
              currentOfflineRef.current + 20,
            ),
          },
        }),
      );
    }
  };

  const renderEmojiList = (category: any) => {
    return (
      <FlatList
        style={{flex: 1}}
        data={groupJson[category]}
        numColumns={itemsPerRow}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => setValue(v => (v += item.emoji))}
              key={item?.emoji}
              style={{
                margin: 5,
                alignItems: 'center',
                width: `${100 / itemsPerRow}%`,
                flexWrap: 'wrap',
              }}>
              <Text style={styles.categoryEmoji}>{item.emoji}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  // Chọn emoji
  const onClick = (emoji: any) => {
    // console.log(emoji.code);
    const emojis = emoji.code;
    const unicode = emojis.codePointAt(0).toString(16);
    const code2 = [...emojis].map(e => e.codePointAt(0).toString(16)).join(`-`);
    // let emo = String.fromCodePoint("0x" + unicode);
    // console.log('unicodeEmoji:>>', unicode, emo);
    console.log('code 2:>>', code2);
    setValue(v => (v += emoji.code));
  };

  // Xóa emoji
  const onRemove = () => {
    function removeLastEmoji(text: string) {
      const emojiRegex =
        /[\uD800-\uDBFF][\uDC00-\uDFFF][\uD800-\uDBFF][\uDC00-\uDFFF]$/;
      if (emojiRegex.test(text)) {
        console.log('trường hợp 2 emoji');
        return text.slice(0, -4);
      }
      return text.slice(0, -2);
    }

    setValue(removeLastEmoji(value));
  };

  // event handler: handle calling (for friend)
  const handleCalling = (type: 'voicecall' | 'videocall') => {
    if (total_member == 2) {
      callDispatch(
        CallActions.callSomeOne({
          type: type,
          groupRef: groupRef,
          name: groupName,
        }),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : keyboard ? 25 : 0}>
      <SafeAreaView style={styles.container}>
        {(!isReady && !networkErr) || (detailGroupLoading && !networkErr) ? (
          <LoadingOverlay />
        ) : null}
        <View style={styles.header}>
          <Header
            Iconback={component.header.back}
            text={detailGroupName ? detailGroupName : groupName}
            status={undefined}
            IconOption1={screen.message.phonecall}
            IconOption2={screen.message.videocall}
            IconOption3={screen.message.list}
            onPressIconOption3={() => {
              navigation.navigate('OptionMessage');
            }}
            title={''}
            onPressIconOption1={() => handleCalling('voicecall')}
            onPressIconOption2={() => handleCalling('videocall')}
          />
        </View>

        <View style={styles.bodyMessage}>
          {/* {listChatData.length === 0 && !detailGroupLoading ?
            <View style={styles.containerNoMessage} >
              <Image style={styles.backgroundNoMessage} source={require('../../assets/images/Screen/MessageScreen/background_sea.jpg')} />
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                {groupAvatar ?
                  <Image style={styles.avatar} source={{ uri: groupAvatar }} />
                  : <View style={styles.avatarNoMessage} >
                    <Text>{getFirstLetters(detailGroupName)}</Text>
                  </View>
                }
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text style={{ color: mainTheme.text, fontSize: 16 }}>{detailGroupName}</Text>
                  <Text style={{ flexWrap: 'wrap' }}>Bắt đầu chia sẻ những câu chuyện thú vị cùng nhau</Text>
                </View>
              </View>
            </View>
            : null} */}

          <View style={styles.MessageView}>
            {loadmore && <Text style={styles.loadmoreText}>Tải thêm</Text>}
            <FlatList
              data={listChatData}
              renderItem={renderItem}
              keyExtractor={item => item.ref}
              showsVerticalScrollIndicator={false}
              inverted={listChatData?.length === 0 ? false : true}
              ref={listRef}
              onEndReached={handleLoadmore}
              windowSize={21}
              ListEmptyComponent={() => {
                return !detailGroupLoading ? (
                  <View
                    style={
                      keyboard || emoPicker || moreOptVisible
                        ? {marginTop: SCREEN.height * 0.1}
                        : {marginTop: SCREEN.height * 0.25}
                    }>
                    <View style={styles.containerNoMessage}>
                      <Image
                        style={styles.backgroundNoMessage}
                        source={require('../../assets/images/Screen/MessageScreen/background_sea.jpg')}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 8,
                        }}>
                        {detailGroupAvatar ? (
                          <Image
                            style={styles.avatar}
                            source={{uri: detailGroupAvatar}}
                          />
                        ) : (
                          <View style={styles.avatarNoMessage}>
                            <Text>{getFirstLetters(detailGroupName)}</Text>
                          </View>
                        )}
                        <View style={{marginLeft: 8, flex: 1}}>
                          <Text style={{color: mainTheme.text, fontSize: 16}}>
                            {detailGroupName}
                          </Text>
                          <Text style={{flexWrap: 'wrap'}}>
                            Bắt đầu chia sẻ những câu chuyện thú vị cùng nhau
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null;
              }}
            />
          </View>

          <View style={styles.MessageInput}>
            <TouchableOpacity
              style={styles.moreInput}
              onPress={handleOpenMoreOpt}>
              <Image style={styles.iconmore} source={screen.message.more} />
            </TouchableOpacity>
            <View style={styles.borderViewInput}>
              <View style={styles.borderInput}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Message..."
                  value={value}
                  onChangeText={text => setValue(text)}
                  enterKeyHint="send"
                  onSubmitEditing={handleSendMessage}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.emoji}
                  onPress={handleOpenEmoji}>
                  <Image
                    style={styles.iconemoji}
                    source={screen.message.emoji}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.send}
                  onPress={handleSendMessage}>
                  <Image
                    style={styles.iconemoji}
                    source={screen.message.sendmessage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {emoPicker ? (
          <View style={{height: '40%'}}>
            <View style={styles.containerCategoryEmoji}>
              {Object.keys(groupJson).map(category => {
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategoryEmoji(category)}>
                    <Text
                      style={[
                        styles.categoryEmoji,
                        selectedCategoryEmoji === category
                          ? {fontSize: 26}
                          : null,
                      ]}>
                      {groupJson[category][0]?.emoji}
                    </Text>
                    {selectedCategoryEmoji === category ? (
                      <View style={styles.selectedCategoryEmoji} />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            {emoPicker &&
              selectedCategoryEmoji &&
              renderEmojiList(selectedCategoryEmoji)}
          </View>
        ) : null}

        <MoreMessageOptions
          visible={moreOptVisible}
          onImagesUpdate={setImagesData}
          extraClearImages={isSend}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
