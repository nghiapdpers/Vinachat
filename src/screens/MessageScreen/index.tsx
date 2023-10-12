import firestore from '@react-native-firebase/firestore';
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
} from 'react-native';
import { component, screen } from '../../assets/images';
import GroupChat from '../../realm/GroupChat';
import { useRealm } from '@realm/react';
import Message from '../../realm/Message';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import EmojiKeyboard from '../../components/EmojiKeyboard';
import styles from './styles';
import mainTheme from '../../assets/colors';
import { useDispatch, useSelector } from 'react-redux';
import { listChatActions } from '../../redux/actions/listChatActions';

// Màn hình chat:
/**
 * Sử dụng redux lưu trữ 20 tin nhắn mới nhất, đồng thời sử dụng Realm để lưu
 * trữ toàn bộ thông tin đoạn chat. Sau khi người dùng két đến hết 20 tin nhắn mới nhất.
 * Thì sử dụng dữ liệu từ Realm để thực hiện loadmore. Nếu dữ liệu của Realm hết thì sẽ gọi  * api để load tiếp dữ liệu từ nơi bị đứt đoạn.
 *
 * Chức năng chat nay được viết trực tiếp bằng firestore đảm bảo sự nhanh chóng (k phải thông qua api như cũ.). Điều này yêu cầu một số cài đặt ở server về phần login và cài đặt ở client.
 *
 * Mục tiêu của app: Nhanh, nhẹ. Các hoạt động realtime sẽ phải nhanh nhất có thê, vì thế hầu hết các chức năng không cần đến realtime hoặc tiêu tốn nhiều thời gian xử lý (filter hàng ngàn user để lọc ra bạn bè...) sẽ được server xử lý và trả về thông tin thông qua API. Đồng thời đảm bảo các logic đăng nhập, đăng ký... và cấu trúc dữ liệu được an toàn.
 */

const database = firestore();
const groupRef = '7KH3Ay7UenvVWJlmMezl';

export default function MessageScreen({ route }: { route: any }) {
  const dispatch = useDispatch();
  const ref = useSelector((s: any) => s.user.data.ref);
  const listChatData = useSelector((s: any) => s.listChat.data);
  const [emoPicker, setEmoPicker] = useState(false);
  const [value, setValue] = useState('');
  const [keyboard, setKeyboard] = useState(false);
  const listRef = useRef<any | FlatList>(null);
  const realm = useRealm()
  console.log(ref);


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
                    ref: item.doc.id,
                    status: 'sended',
                    from: item.doc.data().from,
                    message: item.doc.data().message,
                    sent_time: item.doc.data().sent_time.seconds,
                    type: item.doc.data().type,
                  }),
                );
                realm.write(() => {
                  let groupChat: GroupChat = realm.objects<GroupChat>('GroupChat').filtered(`ref = '${groupRef}'`)[0];
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
                  };
                  groupChat.messages.push(newMessage)
                })
              }
            });
          } else {
            dispatch(
              listChatActions.merge(
                snapshot.docs.map(item => ({
                  ...item.data(),
                  ref: item.id,
                  status: 'sended',
                })),
              ),
            );
            notFirstRender = true;
          }
        },
        err => {
          console.warn(err);
        },
      );

    // unsubcribe firestore chat group
    return () => {
      listenMessage();
    };
  }, []);


  useEffect(() => {
    // ignore initial listen
    let notFirstRender = false;
    const listenMessagetoRealm = database
      .collection('groups')
      .doc(groupRef)
      .collection('messages')
      .orderBy('sent_time', 'desc')
      .onSnapshot(
        snapshot => {
          if (notFirstRender) {
            snapshot.docChanges().forEach(item => {
              if (item.type === 'added') {
                realm.write(() => {
                  let groupChat: GroupChat = realm.objects<GroupChat>('GroupChat').filtered(`ref = '${groupRef}'`)[0];
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
                  };
                  groupChat.messages.push(newMessage)
                })
              }
            });
          }
        },
        err => {
          console.warn(err);
        },
      );

    const specificGroup = realm.objects('GroupChat').filtered(`ref = '${groupRef}'`)[0];
    console.log(specificGroup);
    // unsubcribe firestore chat group
    return () => {
      listenMessagetoRealm();
    };
  }, []);

  //   const yourRef = useRef(null);


  const renderItem = ({ item, index }: any) => {
    const messageFromMe = item.from === ref;

    return (
      <View
        style={[
          styles.messageContainer,
          { alignSelf: messageFromMe ? 'flex-end' : 'flex-start' },
        ]}>
        <View
          style={[
            styles.borderMessage,
            {
              backgroundColor: messageFromMe
                ? mainTheme.lowerFillLogo
                : mainTheme.white,
            },
          ]}>
          <Text style={styles.textMessage}>
            {item.message}
          </Text>
        </View>
        {messageFromMe && index == 0 && (
          <Text style={styles.messageStatus}>
            {item.status == 'sending' ? 'Đang gửi' : 'Đã gửi'}
          </Text>
        )}
      </View>
    );
  };

  //   useEffect(() => {
  //     FetchDataRealm()
  // }, []);

  // useEffect(() => {
  // }, [testfromid, data]);

  // event handler: open emoji picker
  const handleOpenEmoji = useCallback(() => {
    setEmoPicker(true);
    Keyboard.dismiss();
  }, []);

  // event handler: close emoji picker
  const handleCloseEmoji = useCallback(() => {
    setEmoPicker(false);
  }, []);

  Keyboard.addListener('keyboardDidShow', () => {
    handleCloseEmoji();
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

      // save to redux
      dispatch(
        listChatActions.add({
          ref: messageRef,
          from: ref,
          message: value,
          sent_time: now,
          status: 'sending',
          type: 'text',
        }),
      );

      setValue('');
      listRef.current.scrollToOffset({ animated: true, offset: 0 });

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
        });
    } catch (error) {
      console.warn('SEND MESSAGE ERROR >> ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : keyboard ? 25 : 0}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Header
            Iconback={component.header.back}
            text={'ngtrthinhh'}
            status={'Active now'}
            IconOption1={screen.message.phonecall}
            IconOption2={screen.message.videocall}
            IconOption3={screen.message.list}
            title={''}
          />
        </View>

        <View style={styles.bodyMessage}>
          <View style={styles.MessageView}>
            <FlatList
              data={listChatData}
              renderItem={renderItem}
              keyExtractor={item => item.ref}
              showsVerticalScrollIndicator={false}
              inverted
              ref={listRef}
            />
          </View>

          <View style={styles.MessageInput}>
            <TouchableOpacity style={styles.moreInput}>
              <Image style={styles.iconmore} source={screen.message.more} />
            </TouchableOpacity>
            <View style={styles.borderViewInput}>
              <View style={styles.borderInput}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Message..."
                  value={value}
                  onChangeText={text => setValue(text)}
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
        <EmojiKeyboard
          onEmojiSelected={function (e) {
            setValue(v => (v += e + " "));
          }}
          visible={emoPicker}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
