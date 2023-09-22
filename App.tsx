import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './src/screens/CreateAccount';
import Friends from './src/screens/Friends';
import { firstCallAPI } from './src/apis/initApp';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import mainTheme from './src/assets/colors';
import LoginScreen from './src/screens/LoginScreen';
import { Provider } from 'react-redux'
import store from './src/redux/store';

const Stack = createStackNavigator();


const App = () => {

  // Khi vào app sẽ tiến hành call API truyền vào appName để lấy domain và APIKey
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='CreateAccount' component={CreateAccount} />
          <Stack.Screen name='Friends' component={Friends} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;

interface RootStackParamList {
  LoginScreen: any,
  SignUp: any,
  CreateAccount: any,
  Friends: any,
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}