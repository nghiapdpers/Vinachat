import 'react-native-gesture-handler';
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './src/screens/CreateAccount';
import Friends from './src/screens/Friends';
import { firstCallAPI } from './src/apis/initApp';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Dimensions, SafeAreaView } from 'react-native'
import HomeScreen from "../Vinachat/src/screens/HomeScreen";
import LoginScreen from "../Vinachat/src/screens/LoginScreen";
import AccountScreen from "./src/screens/AccountScreen";
import MessageScreen from "./src/screens/MessageScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { screen } from "./src/assets/images";
import mainTheme from "./src/assets/colors";
// Khi vào app sẽ tiến hành call API truyền vào appName để lấy domain và APIKey


// side effect: hide splash screen


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    firstCallAPI({
      "appName": "khttest",
    })
  }, [])

  // side effect: hide splash screen
  useEffect(() => {
    StatusBar.setBackgroundColor(mainTheme.background);
    StatusBar.setBarStyle('dark-content');
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal'
      }}>
        <Stack.Screen name="BottomScreen" component={BottomScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{
          headerShown: false
        }} />
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
    <Tab.Navigator screenOptions={{
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
      <Tab.Screen name="LoginScreen" component={LoginScreen} options={{
        tabBarIcon: () => (
          focusbottom === 'LoginScreen' ? (
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
          focus: () => setFocusbottom('LoginScreen'),
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
