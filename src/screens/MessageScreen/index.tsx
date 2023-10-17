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
  Pressable
} from 'react-native';
import images, { component, screen } from '../../assets/images';
import GroupChat from '../../realm/GroupChat';
import { useRealm } from '@realm/react';
import Message from '../../realm/Message';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import styles from './styles';
import mainTheme from '../../assets/colors';
import MoreMessageOptions from '../../components/MoreMessageOptions';
import { Image as ImageAsset } from 'react-native-image-crop-picker';
import { useCameraPermission } from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';
import { listChatActions } from '../../redux/actions/listChatActions';
import { useRoute } from '@react-navigation/native';
import LoadingOverlay from '../../components/LoadingOverlay';
import apiHelper from '../../apis/apiHelper';
import apiSynchronous from '../../apis/apiSynchronous';

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

// Dữ liệu Emoji (JSON)
const groupJson = require('unicode-emoji-json/data-by-group.json');

export default function MessageScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();

  const route = useRoute();

  const { groupRef, total_member, groupName }: any = route.params;

  const dispatch = useDispatch();
  const ref = useSelector((s: any) => s.user.data.ref);
  const myName = useSelector((s: any) => s.user.data.fullname);

  const listChatData = useSelector((s: any) => s.listChat.data);
  const loadmore = useSelector((s: any) => s.listChat.lmLoading);
  const totalMessage = useSelector((s: any) => s.listChat.lmTotal);
  const currentMessage = useSelector((s: any) => s.listChat.lmCurrent);

  const [isSend, setIsSend] = useState(false);
  const [imagesData, setImagesData] = useState<ImageAsset[]>([]);
  const [moreOptVisible, setMoreOptVisible] = useState(false);
  const [emoPicker, setEmoPicker] = useState(false);
  const [value, setValue] = useState('');
  const [keyboard, setKeyboard] = useState(false);
  const listRef = useRef<any | FlatList>(null);
  const realm = useRealm();
  const [isReady, setIsReady] = useState(false);
  const [selectedCategoryEmoji, setSelectedCategoryEmoji] = useState('Smileys & Emotion');
  const itemsPerRow = 11; // Số emoji trên mỗi hàng

  // side effect: subcribe to listen chat
  useEffect(() => {
    // ignore initial listen
    let notFirstRender = false;

    const listenMessage = database
      .collection('groups')
      .doc(groupRef)
      .collection('messages')
      .orderBy('sent_time', 'desc')
      .limit(20)
      .onSnapshot(
        snapshot => {
          if (notFirstRender) {
            snapshot.docChanges().forEach(item => {
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
                  if (!groupChat) {
                    groupChat = realm.create<GroupChat>('GroupChat', {
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

                  const newMessage = {
                    ref: item.doc.id,
                    status: 'sended',
                    from: item.doc.data().from,
                    message: item.doc.data().message,
                    sent_time: item.doc.data().sent_time.seconds,
                    type: item.doc.data().type,
                    images: item.doc.data().images
                      ? item.doc.data().images.map((url: any) => ({ url: url }))
                      : [],
                  };
                  groupChat.messages.push(newMessage);
                });
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
          console.warn(err);
        },
      );

    // unsubcribe firestore chat group
    return () => {
      dispatch(listChatActions.clear());
      listenMessage();
    };
  }, []);


  const renderItem = ({ item, index }: any) => {
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
          { marginTop: lastMessageSameFrom ? 0 : 18 },
        ]}>
        {!messageFromMe && total_member > 2 && !lastMessageSameFrom && (
          <Text style={[styles.messageFromName]}>{item.from_name}</Text>
        )}

        {item.message.length > 0 && (
          <Text
            style={[
              styles.borderMessage,
              {
                alignSelf: messageFromMe ? 'flex-end' : 'flex-start',
                backgroundColor: messageFromMe
                  ? mainTheme.lowerFillLogo
                  : mainTheme.white,
              },
            ]}>
            {item.message}
          </Text>
        )}

        {item.images && item.images.length > 0 && (
          <>
            {item.images.map((image: any, index: number) => (
              <View
                key={image + index}
                style={[
                  styles.imageMessage,
                  messageFromMe
                    ? { alignSelf: 'flex-end', marginRight: 10 }
                    : { alignSelf: 'flex-start', marginLeft: 10 },
                ]}>
                <Image
                  source={
                    image == 'dang-tai-anh-len-server'
                      ? images.screen.message.loading
                      : { uri: image }
                  }
                  style={
                    image == 'dang-tai-anh-len-server'
                      ? { width: 64, height: 64, alignSelf: 'center' }
                      : { width: '100%', height: '100%', borderRadius: 10 }
                  }
                />
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

  const getMessageLastest = async () => {
    let getMessageLatest = realm
      .objects('GroupChat')
      .filtered(`ref = '${groupRef}'`)[0];
    const messages: any = getMessageLatest?.messages
    const latestMessage = messages?.sorted('sent_time', true)[0];
    console.log('Reposne', latestMessage?.ref);
    console.log(getMessageLatest);


    await apiSynchronous({ group_ref: groupRef, last_chat_ref: latestMessage?.ref }).then((response: any) => {
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
            from: item.from,
            from_name: item.from_name,
            message: item.message,
            sent_time: item.sent_time._seconds,
            type: item.type,
            images: item.images
              ? item.images.map((url: any) => ({ url: url }))
              : [],
          };
          getMessageLatest.messages.push(newMessage);

        })
      })
      console.log(response);


    })
  };

  useEffect(() => {
    getMessageLastest()
  }, []);



  // event handler: open emoji picker
  const handleOpenEmoji = useCallback(() => {
    setEmoPicker(true);
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
    try {
      // create message ref
      const messageRef = firestore()
        .collection('groups')
        .doc(groupRef)
        .collection('messages')
        .doc().id;

      // timestamp
      const now = firestore.Timestamp.now();

      if (imagesData.length == 0) {
        // save to redux
        dispatch(
          listChatActions.add({
            ref: messageRef,
            from: ref,
            message: value,
            sent_time: now,
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
            sent_time: now,
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
      listRef.current.scrollToOffset({ animated: true, offset: 0 });

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
            sent_time: now,
            type: 'text',
            from_name: myName,
          });
      } else {
        const imagesPromise = imagesData.map(async (item: ImageAsset) => {
          // cut filename from path (android)
          let fileName;
          if (Platform.OS === 'ios') {
            fileName = item.filename;
          } else {
            const splitPath = item.path.split('/');
            fileName = splitPath[splitPath.length - 1];
          }

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
            sent_time: now,
            type: 'image',
            from_name: myName,
            images,
          });
      }

      setIsSend(!isSend);
    } catch (error) {
      console.warn('SEND MESSAGE ERROR >> ', error);
    }
  };

  // event handler: loadmore
  const handleLoadmore = () => {
    if (currentMessage < totalMessage && listChatData.length >= 20) {
      dispatch(
        listChatActions.loadmore_start(
          groupRef,
          listChatData[listChatData.length - 1].ref,
        ),
      );
    }
  };


  const renderEmojiList = (category: any) => {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={groupJson[category]}
        numColumns={itemsPerRow}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => setValue(v => (v += item.emoji))}
              key={item?.emoji}
              style={{ margin: 5, alignItems: 'center', width: `${100 / itemsPerRow}%` }}>
              <Text style={styles.categoryEmoji}>{item.emoji}</Text>
            </TouchableOpacity>
          )
        }}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : keyboard ? 25 : 0}>
      <SafeAreaView style={styles.container}>
        {!isReady && <LoadingOverlay />}
        <View style={styles.header}>
          <Header
            Iconback={component.header.back}
            text={groupName}
            status={undefined}
            IconOption1={screen.message.phonecall}
            IconOption2={screen.message.videocall}
            IconOption3={screen.message.list}
            title={''}
          />
        </View>

        <View style={styles.bodyMessage}>
          <View style={styles.MessageView}>
            {loadmore && <Text style={styles.loadmoreText}>Tải thêm</Text>}
            <FlatList
              data={listChatData}
              renderItem={renderItem}
              keyExtractor={item => item.ref}
              showsVerticalScrollIndicator={false}
              inverted
              ref={listRef}
              onEndReached={handleLoadmore}
              windowSize={21}
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
          < View style={{ height: '40%' }}>

            <View style={styles.containerCategoryEmoji}>
              {Object.keys(groupJson).map((category) => {
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategoryEmoji(category)}>
                    <Text style={[styles.categoryEmoji, selectedCategoryEmoji === category ? styles.selectedCategoryEmoji : null]}>{groupJson[category][0]?.emoji}</Text>
                  </TouchableOpacity>
                )
              }
              )}
            </View>

            {emoPicker && selectedCategoryEmoji && renderEmojiList(selectedCategoryEmoji)}

          </View>
        ) : null}

        <MoreMessageOptions
          visible={moreOptVisible}
          onImagesUpdate={setImagesData}
          extraClearImages={isSend}
        />
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
}

{/* <EmojiKeyboard
          onEmojiSelected={function (e) {
            setValue(v => (v += e + ' '));
          }}
          visible={emoPicker}
        /> */}
