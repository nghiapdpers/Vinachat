import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './src/screens/CreateAccount';
import Friends from './src/screens/Friends';
import { firstCallAPI } from './src/apis/initApp';

const Stack = createStackNavigator();

const App = () => {

  // Khi vào app sẽ tiến hành call API truyền vào appName để lấy domain và APIKey
  useEffect(() => {
    firstCallAPI({
      "appName": "khttest",
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Friends" component={Friends} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default App;