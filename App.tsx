import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import message from "@react-native-firebase/messaging";

import SignUp from "./src/screens/SignUp";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "./src/screens/CreateAccount";
import Friends from "./src/screens/Friends";
import {
  Image,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Vinachat/src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import MessageScreen from "./src/screens/MessageScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { screen } from "./src/assets/images";
import mainTheme from "./src/assets/colors";
import SplashScreen from "react-native-splash-screen";
import { getData, storeData } from "./src/storage";
import { LOCALSTORAGE } from "./src/storage/direct";
import {
  actionLoginEnd,
  actionLoginExternalEnd,
} from "./src/redux/actions/userActions";
import QrCode from "./src/screens/AccountScreen/OptionAccount/QrCode";
import ScanQrCode from "./src/screens/ScanQrCode";
import Biometrics from "./src/screens/AccountScreen/OptionAccount/Biometrics";
import CreateGroupChat from "./src/screens/CreateGroupChat";
import "react-native-reanimated";
import { RealmProvider } from "@realm/react";
import GroupChat from "./src/realm/GroupChat";
import Message from "./src/realm/Message";
import User from "./src/realm/User";
import Images from "./src/realm/Images";
import ProfileScreen from "./src/screens/AccountScreen/OptionAccount/Profile";
import EditUserScreen from "./src/screens/AccountScreen/OptionAccount/EditUser";
import DetailImageScreen from "./src/screens/DetailImageScreen";
import useNetworkErr from "./src/config/hooks/useNetworkErr";
import { actionFriendListEnd } from "./src/redux/actions/friendAction";
import { actionListGroupChatEnd } from "./src/redux/actions/listGroupChat";
import AccountSecurity from "./src/screens/AccountScreen/OptionAccount/Account&Security";
import ChangePassword from "./src/screens/AccountScreen/OptionAccount/ChangePassword";
import Privacy from "./src/screens/AccountScreen/OptionAccount/Privacy";
import useLogin from "./src/config/hooks/useLogin";
import OptionMessage from "./src/screens/MessageScreen/OptionMessage";
import AddMemberToGroup from "./src/screens/MessageScreen/OptionMessage/AddMemberToGroup";
import VerifyAccount from "./src/screens/AccountScreen/OptionAccount/VerifyAccount";
import CallScreen from "./src/screens/Call";
import RNCallKeep from "react-native-callkeep";
import { CallProvider } from "./src/screens/Call/context";
import MemberInGroups from "./src/screens/MessageScreen/OptionMessage/MemberInGroups";
import MultiStepVerify from "./src/screens/AccountScreen/OptionAccount/MultiStepVerify";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const HOST = 'localhost';

// // use firestore emulator
// firestore().useEmulator(HOST, 8080);
// auth().useEmulator(`http://${HOST}:9099`);
// storage().useEmulator(HOST, 9199);
// database().useEmulator(HOST, 9000);

firestore().settings({
  persistence: false,
});
database().setPersistenceEnabled(false);

const linkingOptions: LinkingOptions<RootStackParamList> = {
  prefixes: ["vinachat://"],
  config: {
    screens: {
      CallScreen: {
        path: "calling/:type/:status/:name/:groupRef/:callId/:reply",
      },
      ProfileScreen: {
        path: "home/",
      },
    },
  },
};

export default function App() {
  const dispatch = useDispatch();
  const networkErr = useNetworkErr();
  const isLogin = useLogin();

  // Lấy dữ liệu dưới local và nạp lên Redux
  const getLocalData = async () => {
    const [user, friendList, groupChat, fcmToken] = await Promise.all([
      getData(LOCALSTORAGE.user),
      getData(LOCALSTORAGE.friendList),
      getData(LOCALSTORAGE.groupChat),
      getData(LOCALSTORAGE.fcmToken),
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

    // if (!fcmToken) {
    //   const token = await message().getToken();
    //   await storeData(LOCALSTORAGE.fcmToken, token);
    // }

    return 0;
  };

  // setup callkeep options:
  const setupCallKeep = () => {
    RNCallKeep.setup({
      ios: {
        appName: "Vinachat",
        supportsVideo: true,
      },
      android: {
        alertTitle: "Yêu cầu quyền truy cập",
        alertDescription:
          "Ứng dụng này sử dụng quyền quản lý truy cập cuộc gọi để nhận được các cuộc gọi đến",
        cancelButton: "Từ chối",
        okButton: "Cấp quyền",
        additionalPermissions: [
          "android.permission.RECORD_AUDIO",
          "android.permission.ACCESS_NETWORK_STATE",
          "android.permission.CHANGE_NETWORK_STATE",
          "android.permission.MODIFY_AUDIO_SETTINGS",
          "android.permission.USE_BIOMETRIC",
          "android.permission.USE_FINGERPRINT",
          "android.permission.INTERNET",
          "android.permission.CAMERA",
          "android.permission.READ_MEDIA_IMAGES",
          "android.permission.READ_MEDIA_VIDEO",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.BIND_TELECOM_CONNECTION_SERVICE",
          "android.permission.FOREGROUND_SERVICE",
          "android.permission.READ_PHONE_STATE",
          "android.permission.CALL_PHONE",
          "android.permission.SYSTEM_ALERT_WINDOW",
          "android.permission.ACTION_MANAGE_OVERLAY_PERMISSION",
          "android.permission.WAKE_LOCK",
        ],
      },
    });
  };

  // side effect: run after initial rendered
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(mainTheme.background);
      StatusBar.setBarStyle("dark-content");
    }

    // hide splash screen after get local data
    getLocalData()
      .then(() => {
        setTimeout(() => {
          SplashScreen.hide();
        }, 100);
      })
      .catch((err) => {
        console.log(":::: GET LOCAL DATA ERROR :::: >> N", err);
      });

    // setup options for CallKeep
    setupCallKeep();
  }, []);

  useEffect(() => {
    if (isLogin) {
      RNCallKeep.setAvailable(true);
    } else {
      RNCallKeep.setAvailable(false);
    }
  }, [isLogin]);

  return (
    <RealmProvider schema={[GroupChat, Message, User, Images]}>
      {networkErr && (
        <Text style={styles.networkError}>Lỗi mạng, đang kết nối lại...</Text>
      )}
      <CallProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              // gestureEnabled: true,
              // gestureDirection: 'horizontal',
              headerShown: false,
            }}
          >
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
                <Stack.Screen
                  name="CreateGroupChat"
                  component={CreateGroupChat}
                />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen
                  name="EditUserScreen"
                  component={EditUserScreen}
                />
                <Stack.Screen
                  name="DetailImageScreen"
                  component={DetailImageScreen}
                />
                <Stack.Screen
                  name="AccountSecurity"
                  component={AccountSecurity}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                />
                <Stack.Screen name="Privacy" component={Privacy} />
                <Stack.Screen name="OptionMessage" component={OptionMessage} />
                <Stack.Screen
                  name="AddMemberToGroup"
                  component={AddMemberToGroup}
                />
                <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
                <Stack.Screen
                  name="MemberInGroups"
                  component={MemberInGroups}
                />
                <Stack.Screen
                  name="MultiStepVerify"
                  component={MultiStepVerify}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CallProvider>
    </RealmProvider>
  );
}

function BottomScreen() {
  const [focusbottom, setFocusbottom] = useState("HomeScreen");

  useEffect(() => {
    setFocusbottom("HomeScreen");
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.BottomTabStyle,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () =>
            focusbottom === "HomeScreen" ? (
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
          focus: () => setFocusbottom("HomeScreen"),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarIcon: () =>
            focusbottom === "Friends" ? (
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
          focus: () => setFocusbottom("Friends"),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: () =>
            focusbottom === "AccountScreen" ? (
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
          focus: () => setFocusbottom("AccountScreen"),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  borderFocus: {
    width: "100%",
    height: 4,
    backgroundColor: mainTheme.logo,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    top: 0,
  },
  imageIconBottom: {
    width: 30,
    height: 30,
  },
  BottomTabStyle: {
    justifyContent: "center",
    height: Platform.OS === "ios" ? 90 : 60,
    backgroundColor: mainTheme.background,
  },
  activeLabel: {
    color: mainTheme.logo,
    fontSize: 13,
    fontWeight: "600",
  },

  networkError: {
    fontSize: 15,
    fontWeight: "500",
    color: mainTheme.logo,
    paddingVertical: 3,
    textAlign: "center",
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
  EditUserScreen: any;
  AccountSecurity: any;
  ChangePassword: any;
  Privacy: any;
  OptionMessage: any;
  AddMemberToGroup: any;
  CallScreen: any;
  ProfileScreen: any;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
