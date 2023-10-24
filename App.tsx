import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import SignUp from './src/screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './src/screens/CreateAccount';
import Friends from './src/screens/Friends';
import { Image, StyleSheet, View, Platform, StatusBar, Text } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Vinachat/src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import MessageScreen from './src/screens/MessageScreen';
import SearchScreen from './src/screens/SearchScreen';
import { screen } from './src/assets/images';
import mainTheme from './src/assets/colors';
import SplashScreen from 'react-native-splash-screen';
import { getData } from './src/storage';
import { LOCALSTORAGE } from './src/storage/direct';
import {
  actionLoginEnd,
  actionLoginExternalEnd,
} from './src/redux/actions/userActions';
import QrCode from './src/screens/AccountScreen/OptionAccount/QrCode';
import ScanQrCode from './src/screens/ScanQrCode';
import Biometrics from './src/screens/AccountScreen/OptionAccount/Biometrics';
import CreateGroupChat from './src/screens/CreateGroupChat';
import 'react-native-reanimated';
import { RealmProvider } from '@realm/react';
import GroupChat from './src/realm/GroupChat';
import Message from './src/realm/Message';
import User from './src/realm/User';
import Images from './src/realm/Images';
import ProfileScreen from './src/screens/AccountScreen/OptionAccount/Profile';
import EditUserScreen from './src/screens/AccountScreen/OptionAccount/EditUser';
import DetailImageScreen from './src/screens/DetailImageScreen';
import useNetworkErr from './src/config/hooks/useNetworkErr';
import { actionFriendListEnd } from './src/redux/actions/friendAction';
import { actionListGroupChatEnd } from './src/redux/actions/listGroupChat';
import AccountSecurity from './src/screens/AccountScreen/OptionAccount/Account&Security';
import ChangePassword from './src/screens/AccountScreen/OptionAccount/ChangePassword';
import Privacy from './src/screens/AccountScreen/OptionAccount/Privacy';
import useLogin from './src/config/hooks/useLogin';
import OptionMessage from './src/screens/MessageScreen/OptionMessage';
import AddMemberToGroup from './src/screens/MessageScreen/OptionMessage/AddMemberToGroup';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const HOST = '192.168.0.117';

// use firestore emulator
// firestore().useEmulator(HOST, 8080);
// auth().useEmulator(`http://${HOST}:9099`);
// storage().useEmulator(HOST, 9199);

export default function App() {
  const dispatch = useDispatch();
  const networkErr = useNetworkErr();
  const isLogin = useLogin();

  // Lấy dữ liệu dưới local và nạp lên Redux
  const getLocalData = async () => {
    const [user, friendList, groupChat] = await Promise.all([
      getData(LOCALSTORAGE.user),
      getData(LOCALSTORAGE.friendList),
      getData(LOCALSTORAGE.groupChat),
    ]);

    if (user) {
      dispatch(actionLoginEnd(user));
    }

    if (friendList) {
      dispatch(actionFriendListEnd(friendList));
    }

    if (groupChat) {
      dispatch(actionListGroupChatEnd(groupChat));
    }
  };

  // side effect: hide splash screen
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(mainTheme.background);
      StatusBar.setBarStyle('dark-content');
    }

    getLocalData()
      .then(() => {
        setTimeout(() => {
          SplashScreen.hide();
        }, 100);
      })
      .catch(err => {
        console.log(':::: GET LOCAL DATA ERROR :::: >> N', err);
      });
  }, []);

  return (
    <RealmProvider schema={[GroupChat, Message, User, Images]}>
      {networkErr && (
        <Text style={styles.networkError}>Lỗi mạng, đang kết nối lại...</Text>
      )}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // gestureEnabled: true,
            // gestureDirection: 'horizontal',
            headerShown: false,
          }}>
          {!isLogin ? (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="CreateAccount" component={CreateAccount} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
            <>
              <Stack.Screen name="BottomScreen" component={BottomScreen} />
              <Stack.Screen name="MessageScreen" component={MessageScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="Friends" component={Friends} />
              <Stack.Screen name="QrCode" component={QrCode} />
              <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
              <Stack.Screen name="Biometrics" component={Biometrics} />
              <Stack.Screen name="OptionMessage" component={OptionMessage} />
              <Stack.Screen
                name="CreateGroupChat"
                component={CreateGroupChat}
              />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="EditUserScreen" component={EditUserScreen} />
              <Stack.Screen
                name="DetailImageScreen"
                component={DetailImageScreen}
              />
              <Stack.Screen
                name="AccountSecurity"
                component={AccountSecurity}
              />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="Privacy" component={Privacy} />
              <Stack.Screen name="AddMemberToGroup" component={AddMemberToGroup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

function BottomScreen() {
  const [focusbottom, setFocusbottom] = useState('HomeScreen');

  useEffect(() => {
    setFocusbottom('HomeScreen');
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.BottomTabStyle,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () =>
            focusbottom === 'HomeScreen' ? (
              <>
                <View style={styles.borderFocus} />
                <Image
                  style={styles.imageIconBottom}
                  resizeMode="contain"
                  source={screen.bottomtab.active_home}
                />
                <Text style={styles.activeLabel}>Home</Text>
              </>
            ) : (
              <Image
                style={styles.imageIconBottom}
                resizeMode="contain"
                source={screen.bottomtab.unactive_home}
              />
            ),

          tabBarLabel: () => null,
          headerShown: false,
        }}
        listeners={{
          focus: () => setFocusbottom('HomeScreen'),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarIcon: () =>
            focusbottom === 'Friends' ? (
              <>
                <View style={styles.borderFocus} />
                <Image
                  style={styles.imageIconBottom}
                  resizeMode="contain"
                  source={screen.bottomtab.active_friend}
                />
                <Text style={styles.activeLabel}>Friend</Text>
              </>
            ) : (
              <Image
                style={styles.imageIconBottom}
                resizeMode="contain"
                source={screen.bottomtab.unactive_friend}
              />
            ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
        listeners={{
          focus: () => setFocusbottom('Friends'),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: () =>
            focusbottom === 'AccountScreen' ? (
              <>
                <View style={styles.borderFocus} />
                <Image
                  style={styles.imageIconBottom}
                  resizeMode="contain"
                  source={screen.bottomtab.active_user}
                />
                <Text style={styles.activeLabel}>Proflie</Text>
              </>
            ) : (
              <Image
                style={styles.imageIconBottom}
                resizeMode="contain"
                source={screen.bottomtab.unactive_user}
              />
            ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
        listeners={{
          focus: () => setFocusbottom('AccountScreen'),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  borderFocus: {
    width: '100%',
    height: 4,
    backgroundColor: mainTheme.logo,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
  },
  imageIconBottom: {
    width: 30,
    height: 30,
  },
  BottomTabStyle: {
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 90 : 60,
    backgroundColor: mainTheme.background,
  },
  activeLabel: {
    color: mainTheme.logo,
    fontSize: 13,
    fontWeight: '600',
  },

  networkError: {
    fontSize: 15,
    fontWeight: '500',
    color: mainTheme.logo,
    paddingVertical: 3,
    textAlign: 'center',
  },
});

export type RootStackParamList = {
  BottomScreen: any;
  MessageScreen: any;
  SearchScreen: any;
  SignUp: any;
  CreateAccount: any;
  Friends: any;
  LoginScreen: any;
  CreateGroupChat: any;
  DetailImageScreen: any;
  OptionMessage: any;
  AddMemberToGroup: any;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
