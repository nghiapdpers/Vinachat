import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './src/screens/CreateAccount';
import Friends from './src/screens/Friends';
import { StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { useDispatch, useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Platform } from 'react-native'
import HomeScreen from "../Vinachat/src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import MessageScreen from "./src/screens/MessageScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { screen } from "./src/assets/images";
import mainTheme from "./src/assets/colors";
import SplashScreen from 'react-native-splash-screen';
import { getData } from "./src/storage";
import { LOCALSTORAGE } from "./src/storage/direct";
import { actionLoginEnd, actionLoginExternalEnd } from "./src/redux/actions/userActions";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  const dispatch = useDispatch()

  const [isC, setC] = useState(false);

  // Lấy dữ liệu dưới local và nạp lên Redux
  const getApiKey = async () => {
    const [res, resExternal] = await Promise.all([
      getData(LOCALSTORAGE.user),
      getData(LOCALSTORAGE.userExternal)
    ]);

    if (res) {
      setC(true);
      dispatch(actionLoginEnd(res));
    }

    if (resExternal) {
      setC(true);
      dispatch(actionLoginExternalEnd(resExternal));
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 100)
  }


  // side effect: hide splash screen
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(mainTheme.background);
      StatusBar.setBarStyle('dark-content');
    }
    getApiKey()
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={isC ? BottomScreen : LoginScreen} />
        <Stack.Screen name="BottomScreen" component={BottomScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Friends" component={Friends} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

function BottomScreen() {
  const [focusbottom, setFocusbottom] = useState('HomeScreen');

  useEffect(() => {
    setFocusbottom('HomeScreen')
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.BottomTabStyle,
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
        tabBarIcon: () => (
          focusbottom === 'HomeScreen' ? (
            <View style={styles.borderFocus}>
              <Image
                style={styles.imageIconBottom}
                resizeMode="contain"
                source={screen.bottomtab.home}
              />
            </View>
          ) : (
            <Image
              style={styles.imageIconBottom}
              resizeMode="contain"
              source={screen.bottomtab.home}
            />
          )
        ),

        tabBarLabel: () => null,
        headerShown: false,
      }}
        listeners={{
          focus: () => setFocusbottom('HomeScreen'),
        }} />
      <Tab.Screen name="Friends" component={Friends} options={{
        tabBarIcon: () => (
          focusbottom === 'Friends' ? (
            <View style={styles.borderFocus}>
              <Image
                style={styles.imageIconBottom}
                resizeMode="contain"
                source={screen.bottomtab.friend}
              />
            </View>
          ) : (
            <Image
              style={styles.imageIconBottom}
              resizeMode="contain"
              source={screen.bottomtab.friend}
            />
          )),
        tabBarLabel: () => null,
        headerShown: false,
      }}
        listeners={{
          focus: () => setFocusbottom('Friends'),
        }} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} options={{
        tabBarIcon: () => (
          focusbottom === 'AccountScreen' ? (
            <View style={styles.borderFocus}>
              <Image
                style={styles.imageIconBottom}
                resizeMode="contain"
                source={screen.bottomtab.user}
              />
            </View>
          ) : (
            <Image
              style={styles.imageIconBottom}
              resizeMode="contain"
              source={screen.bottomtab.user}
            />
          )),
        tabBarLabel: () => null,
        headerShown: false,
      }}
        listeners={{
          focus: () => setFocusbottom('AccountScreen'),
        }} />
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
  borderFocus: {
    width: 50,
    height: 50,
    backgroundColor: mainTheme.logo,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 10,
    borderColor: 'transparent'
  },
  imageIconBottom: {
    width: 30,
    height: 30
  },
  BottomTabStyle: {
    justifyContent: 'center',
    padding: 10
  }
})

export type RootStackParamList = {
  BottomScreen: any,
  MessageScreen: any,
  SearchScreen: any,
  SignUp: any,
  CreateAccount: any,
  Friends: any,
  LoginScreen: any,
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
