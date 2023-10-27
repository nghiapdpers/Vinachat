import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles';
import {screen, component} from '../../../assets/images';
import mainTheme from '../../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import Header3 from '../../../components/Header3';
import {useDispatch, useSelector} from 'react-redux';
import ModalNotification from '../../../components/ModalNotification';
import UpdateAvatarPicker from '../../../components/UpdateAvatarPicker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {actionListGroupChatStart} from '../../../redux/actions/listGroupChat';
import TextInputModal from '../../../components/TextInputModal';
import Header from '../../../components/Header';
import detailGroupChatReducer from '../../../redux/reducers/detailGroupChatReducer';
import {DetailGroupChatActions} from '../../../redux/actions/getDetailGroupChatActions';

export default function OptionMessage({route}: {route: any}) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const groupRef = useSelector((s: any) => s.detailGroup.ref);
  const adminRef = useSelector((s: any) => s.detailGroup.adminRef);
  const total_member = useSelector((s: any) => s.detailGroup.total_member);
  const groupName = useSelector((s: any) => s.detailGroup.name);
  const groupAvatar = useSelector((s: any) => s.detailGroup.groupAvatar);

  const user = useSelector((state: any) => state?.user);
  const CheckAdminRef = user?.data?.ref === adminRef;
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [isNotification, setisNotification] = useState(false);
  const [avatarPicker, setAvatarPicker] = useState(false);
  const [changeGroupName, setChangeGroupName] = useState(false);

  const data = [
    {
      id: 1,
      title: 'Tuỳ chỉnh',
      data: [
        {
          id: 1.1,
          icon: screen.optionmessage.colorcircle,
          title: 'Theme',
        },
        {
          id: 1.2,
          icon: screen.optionmessage.nickname,
          title: 'Biệt hiệu',
        },
        {
          id: 1.3,
          icon: screen.optionmessage.smile,
          title: 'Biểu cảm',
        },
      ],
    },
    {
      id: 2,
      title: 'Chức năng khác',
      data: [
        {
          id: 2.1,
          icon: screen.optionmessage.add,
          title: 'Thêm thành viên mới vào nhóm',
        },
        {
          id: 2.4,
          icon: screen.optionmessage.avatar,
          title: 'Thay đổi ảnh đại diện nhóm',
        },
        {
          id: 2.5,
          icon: screen.optionmessage.text,
          title: 'Thay đổi tên nhóm',
        },
        {
          id: 2.2,
          icon: screen.optionmessage.notification,
          title: 'Thông báo & Âm thanh',
        },
        {
          id: 2.3,
          icon: screen.optionmessage.picture,
          title: 'Xem hình ảnh , file và link',
        },
      ],
    },
    {
      id: 3,
      title: 'Quyền riêng tư và hỗ trợ',
      data: [
        {
          id: 3.1,
          icon: screen.optionmessage.block,
          title: 'Chặn',
        },
        {
          id: 3.2,
          icon: screen.optionmessage.warning,
          title: 'Báo cáo',
        },
        {
          id: 3.3,
          icon: screen.optionmessage.logout,
          title: 'Rời nhóm',
        },
      ],
    },
  ];

  const filteredData =
    total_member > 2
      ? data
      : data.map(section => ({
          ...section,
          data: section.data.filter(
            item =>
              item.id !== 2.1 &&
              item.id !== 3.3 &&
              item.id !== 2.4 &&
              item.id !== 2.5,
          ),
        }));

  const handlebtn = async (data: any) => {
    switch (data.id) {
      case 2.1: {
        if (CheckAdminRef) {
          navigation.navigate('AddMemberToGroup');
        } else {
          setisNotification(true);
          setTimeout(() => {
            setisNotification(false);
          }, 5000);
        }
        break;
      }

      case 2.4: {
        if (CheckAdminRef) {
          setAvatarPicker(true);
        } else {
          setisNotification(true);
          setTimeout(() => {
            setisNotification(false);
          }, 5000);
        }
        break;
      }

      case 2.5: {
        if (CheckAdminRef) {
          setChangeGroupName(true);
        } else {
          setisNotification(true);
          setTimeout(() => {
            setisNotification(false);
          }, 5000);
        }
        break;
      }

      default: {
        setisVisibleModal(true);
        break;
      }
    }
  };

  // event handler: update group avatar
  const handleUpdateGroupAvatar = async (image: string) => {
    try {
      if (image != groupAvatar) {
        const avatar = storage()
          .ref('groups')
          .child(groupRef)
          .child('groupAvatar_' + groupRef);

        await avatar.putFile(image);

        const avatarUrl = await avatar.getDownloadURL();

        const groupDoc = firestore().collection('groups').doc(groupRef);

        await groupDoc.update({
          groupAvatar: avatarUrl,
        });

        dispatch(actionListGroupChatStart());
        dispatch(DetailGroupChatActions.start(groupRef));

        setAvatarPicker(false);
      }
    } catch (error) {
      console.log(
        ':::: OPTION MESSAGE / HANDLE-UPDATE-GROUP-AVATAR >> ERROR ::::\n',
        error,
      );
    }
  };

  // event handler: change group name
  const handleChangeGroupName = async (newName: string) => {
    try {
      const groupDoc = firestore().collection('groups').doc(groupRef);

      await groupDoc.update({
        name: newName,
      });

      dispatch(actionListGroupChatStart());
      dispatch(DetailGroupChatActions.start(groupRef));

      setChangeGroupName(false);
    } catch (error) {
      console.log(
        ':::: OPTION MESSAGE / HANDLE-CHANGE-GROUP-NAME >> ERROR ::::\n',
        error,
      );
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <View key={item.id}>
        <View style={styles.viewtitle}>
          <Text style={styles.texttitle}>{item.title}</Text>
        </View>
        {item.data && Array.isArray(item.data)
          ? item.data.map((data: any) => (
              <TouchableOpacity
                style={styles.viewborder}
                key={data.id}
                onPress={() => {
                  handlebtn(data);
                }}>
                <Image style={styles.image} source={data.icon} />
                <Text
                  style={[
                    styles.textoption,
                    {color: data.id === 3.3 ? '#e04f5f' : 'black'},
                  ]}>
                  {data.title}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          opacity: isVisibleModal === true ? 0.3 : 1,
        },
      ]}>
      <View style={styles.header}>
        <Header Iconback={component.header.back} text={groupName} />
      </View>

      <Image
        source={groupAvatar ? {uri: groupAvatar} : screen.profile.usermale}
        style={styles.groupAvatar}
      />

      <Text style={styles.groupName}>{groupName}</Text>

      <View style={styles.body}>
        {isNotification === true ? (
          <View style={styles.StylesAlert}>
            <Text style={styles.textAlert}>
              Bạn không có quyền hạn để làm việc này
            </Text>
          </View>
        ) : null}
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <ModalNotification
        isVisible={isVisibleModal}
        setisVisible={setisVisibleModal}
        text={'Tính năng đang phát triển'}
      />
      <UpdateAvatarPicker
        imageSource={groupAvatar}
        visible={avatarPicker}
        onOutsidePress={() => setAvatarPicker(false)}
        onUpdatePress={handleUpdateGroupAvatar}
      />
      {changeGroupName && (
        <TextInputModal
          title={'Tên nhóm mới là:'}
          onOutsidePress={() => setChangeGroupName(false)}
          onConfirmPress={handleChangeGroupName}
        />
      )}
    </SafeAreaView>
  );
}
