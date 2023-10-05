import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import React, {useCallback, useEffect, useState, useRef} from 'react';
import Header from '../../components/Header';
import EmojiKeyboard from '../../components/EmojiKeyboard';
import styles from './styles';
import {component, screen} from '../../assets/images';
import mainTheme from '../../assets/colors';

const database = firestore();

const api =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiJqRHVBUVlwcHJ1YUtZcElleGZCUiIsInV1aWQiOiIzMzk5N2QwYy0wZTkzLTUzMzctYTFjMy0wOWFlMGE2OWJkMTEiLCJpYXQiOjE2OTY0NzczOTAsImV4cCI6MTY5NjQ4MDk5MH0.OD-NpBqMBB5PFxrhmP625Ww7XA7TGeWpBKLAkLKwn2Q';
const groupRef = 'VZsIsq9hUZw5plgW2ZUC';
const ref = 'jDuAQYppruaKYpIexfBR';

export default function MessageScreen({route}: {route: any}) {
  const [emoPicker, setEmoPicker] = useState(false);
  const [value, setValue] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [keyboard, setKeyboard] = useState(false);
  const listRef = useRef<any | FlatList>(null);

  // fetch api to get message list
  const fetchdata = async () => {
    const result = await fetchMessageList(api, groupRef, 1);

    if (result.message == 'success') {
      setData(result.data.chats);
    }
  };

  // side effect: subcribe to listen chat
  useEffect(() => {
    // ignore initial listen
    let initial = false;

    const listenMessage = database
      .collection('groups')
      .doc(groupRef)
      .collection('messages')
      .orderBy('sent_time', 'desc')
      .limit(20)
      .onSnapshot(
        snapshot => {
          if (initial) {
            snapshot.docChanges().forEach(item => {
              if (item.type === 'added') {
                setData(a => [{...item.doc.data(), ref: item.doc.id}, ...a]);
              }
            });
          } else {
            setData(
              snapshot.docs.map(item => ({
                ...item.data(),
                ref: item.id,
              })),
            );
            initial = true;
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

  const renderItem = ({item}: {item: any}) => {
    const messageFromMe = item.from === ref;

    return (
      <View
        style={[
          styles.messageContainer,
          {alignSelf: messageFromMe ? 'flex-end' : 'flex-start'},
        ]}>
        <Text
          style={[
            styles.borderMessage,
            {
              backgroundColor: messageFromMe
                ? mainTheme.lowerFillLogo
                : mainTheme.white,
            },
          ]}>
          {item.message}
        </Text>
      </View>
    );
  };

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
    sendMessage(api, groupRef, value);
    setValue('');
    listRef.current.scrollToOffset({animated: true, offset: 0});
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
              data={data}
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
            setValue(v => (v += e));
          }}
          visible={emoPicker}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

async function fetchMessageList(
  api: string,
  groupRef: string,
  page: number,
  last_chat_id?: string,
) {
  try {
    const result = await fetch(
      'http://10.0.2.2:5000/api/group/getListMessage',
      {
        headers: {
          ['Authorization']: 'Bearer ' + api,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          group_ref: groupRef,
          page: page,
          last_chat_id: last_chat_id ? last_chat_id : '',
        }),
      },
    );

    return result.json();
  } catch (error) {
    console.log(' FETCH MESSAGE LIST ERROR >> ', error);
  }
}

async function sendMessage(api: string, groupRef: string, message: string) {
  try {
    const result = await fetch('http://10.0.2.2:5000/api/group/sendMessage', {
      headers: {
        ['Authorization']: 'Bearer ' + api,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        to_group_ref: groupRef,
        message: message,
      }),
    });

    return result.json();
  } catch (error) {
    console.log(' SEND MESSAGE ERROR >> ', error);
  }
}

// const FetchDataRealm = async () => {
//   try {
//     const realm = await Realm.open({schema: [GroupChat, User, Message]});
//     const specificGroup = realm
//       .objects('GroupChat')
//       .filtered(`ref = '${ref}'`)[0];
//     console.log(specificGroup);

//     if (specificGroup) {
//       const messages = specificGroup.message;
//       setData(messages);
//     } else {
//       console.log('Không tìm thấy nhóm với ref cụ thể:');
//     }
//   } catch (error) {
//     console.log('LOIIIII', error);
//   }
// };

// const HandleSendMessage = async () => {
//   handleCloseEmoji();
//   try {
//     const realm = await Realm.open({schema: [GroupChat, User, Message]});

//     realm.write(() => {
//       let groupChat: any = realm
//         .objects<GroupChat>('GroupChat')
//         .filtered(`ref = '${ref}'`)[0];
//       if (!groupChat) {
//         groupChat = realm.create<GroupChat>('GroupChat', {
//           ref: ref,
//           member: [],
//           message: [],
//         });
//       }

//       const newMessage = {
//         message_text: value,
//         from_user_id: testfromid,
//         sent_time: new Date().toISOString(),
//       };

//       groupChat.message.push(newMessage);
//     });

//     console.log('Message sent successfully');
//     FetchDataRealm();
//     setValue('');
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// };
{
  /* <View
          style={{
            height: 60,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 40,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setTestFromId('1');
            }}>
            <Text>Tui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setTestFromId('2');
            }}>
            <Text>Ban</Text>
          </TouchableOpacity>
        </View> */
}
