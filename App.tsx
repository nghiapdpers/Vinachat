import 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

import SignUp from './src/screens/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAccount from './src/screens/CreateAccount';
import Friends from './src/screens/Friends';
import {firstCallAPI} from './src/apis/initApp';
import {StatusBar, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View, Platform, SafeAreaView} from 'react-native';
import HomeScreen from '../Vinachat/src/screens/HomeScreen';
import LoginScreen from '../Vinachat/src/screens/LoginScreen';
import AccountScreen from './src/screens/AccountScreen';
import MessageScreen from './src/screens/MessageScreen';
import SearchScreen from './src/screens/SearchScreen';
import {screen} from './src/assets/images';
import mainTheme from './src/assets/colors';
import SplashScreen from 'react-native-splash-screen';
import QrCode from './src/screens/AccountScreen/OptionAccount/QrCode';
import ScanQrCode from './src/screens/SearchScreen/ScanQrCode';
import Biometrics from './src/screens/AccountScreen/OptionAccount/Biometrics';
import 'react-native-reanimated';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// use fierstore emulator
firestore().useEmulator('localhost', 8080);

export default function App() {
  // useEffect(() => {
  //   firstCallAPI({
  //     appName: 'khttest',
  //   });
  // }, []);

  // side effect: hide splash screen
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(mainTheme.background);
      StatusBar.setBarStyle('dark-content');
    }
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomScreen"
          component={BottomScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="QrCode"
          component={QrCode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScanQrCode"
          component={ScanQrCode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Biometrics"
          component={Biometrics}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    height: 60,
    backgroundColor: mainTheme.background,
  },
  activeLabel: {
    color: mainTheme.logo,
    fontSize: 13,
    fontWeight: '600',
  },
});
