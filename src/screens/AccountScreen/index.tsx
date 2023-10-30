import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Header from '../../components/Header';
import { component, screen } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { getData, removeData } from '../../storage';
import { LOCALSTORAGE } from '../../storage/direct';
import {
  actionClearMessage,
  actionClearUser,
  actionLogoutStart,
} from '../../redux/actions/userActions';
import { StackActions, useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../components/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { actionClearGroupChat } from '../../redux/actions/listGroupChat';
import { listChatActions } from '../../redux/actions/listChatActions';
import { actionClearFriend } from '../../redux/actions/friendAction';

const datauser = [
  {
    id: 1,
    icon: screen.account.profile,
    title: 'Trang cá nhân',
    description: 'Xem trang cá nhân của bạn',
    navigation: 'ProfileScreen',
  },
  {
    id: 2,
    icon: screen.account.encrypted,
    title: 'Tài khoản và bảo mật',
    description: '',
    navigation: 'AccountSecurity',
  },
  {
    id: 3,
    icon: screen.account.padlock,
    title: 'Quyền riêng tư',
    description: '',
    navigation: 'Privacy',
  },
  {
    id: 4,
    icon: screen.home.qrcode,
    title: 'QR Code',
    description: '',
    navigation: 'QrCode',
  },
  {
    id: 5,
    icon: screen.login.faceid,
    title: 'Xác thực TouchID/FaceID',
    description: '',
    navigation: 'Biometrics',
  },
];

export default function AccountScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state: any) => state?.user);
  const loading = useSelector((state: any) => state?.user?.loading);
  // console.log('userAccountScreen:>>', user);
  // console.log('userAccountScreen:>>', userExternal);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.BorderOption}
        onPress={() => {
          navigation.navigate(item.navigation);
        }}>
        <View style={styles.FlexboxIcon}>
          <Image style={{ width: 30, height: 30 }} source={item.icon} />
        </View>
        <View style={styles.FlexboxTitle}>
          <Text style={styles.textTitle}>{item.title}</Text>
          {item.description === '' ? null : (
            <Text style={styles.textdescription}>{item.description}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Đăng xuất
  const handleLogout = async () => {
    // Gọi action Logout
    dispatch(actionLogoutStart);
    // Xóa dữ liệu Redux
    dispatch(actionClearGroupChat);
    dispatch(actionClearFriend);
    dispatch(actionClearMessage);
    // Xóa dữ liệu trong Local
    await removeData(LOCALSTORAGE.user);
    await removeData(LOCALSTORAGE.userExternal);
    await removeData(LOCALSTORAGE.apikey);
    await removeData(LOCALSTORAGE.groupChat);
    await removeData(LOCALSTORAGE.friendList);
    // navigation.dispatch(StackActions.replace('LoginScreen'));

    // sign out firebase auth.
    auth().signOut();

    dispatch(listChatActions.clear());
  };

  return (
    <>
      {loading ? (
        <LoadingOverlay visible={loading} />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.topAccount}>
            <View style={styles.headerTopAccount}>
              <View style={styles.AvatarUserFlexbox}>
                {user?.data?.avatar ? (
                  <Image
                    style={styles.AvatarUser}
                    source={{ uri: user.data.avatar }}
                  />
                ) : (
                  <View style={styles.AvatarUser}></View>
                )}
              </View>
              <View style={styles.NameUserFlexbox}>
                <Text style={styles.UserName}>
                  {user?.data?.fullname}
                </Text>
                <Text style={styles.fullnameUser}>
                  {user?.data?.mobile}
                </Text>
              </View>
            </View>
            <View style={styles.bodyTopAccount}>
              {user?.data?.nickname ? (
                <Text style={styles.textBio}>
                  {user?.data?.nickname}
                </Text>
              ) : null}
              {user?.data?.email ? (
                <TouchableOpacity>
                  <Text style={styles.linkAccount}>
                    {user?.data?.email}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.bodyAccount}>
            <FlatList data={datauser} renderItem={renderItem} />
          </View>
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.buttonLogout}>
            <Text style={styles.textLogout}>Đăng xuất</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
}
