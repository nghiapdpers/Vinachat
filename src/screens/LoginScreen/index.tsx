import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import TextButton from '../../components/TextButton';
import Button from '../../components/Button';
import { screen } from '../../assets/images';
import { useNavigation } from '@react-navigation/core';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

export default function LoginScreen() {
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
  const navigation = useNavigation();
  const [checkBiometrics, setcheckBiometrics] = useState('');
  const [mobile, setmobile] = useState('0888190357')
  const [password, setpassword] = useState('')

  useEffect(() => {
    CheckSupported()
    SaveSupported(checkBiometrics)
  }, [checkBiometrics])

  const handleLoginBiometrics = async () => {
    try {
      rnBiometrics.simplePrompt({ promptMessage: 'Confirm biometrics' })
        .then(async (resultObject: any) => {
          const storedMobile: any = await AsyncStorage.getItem('@UserRegisted_Biometrics');
          if (storedMobile) {
            const mobile = storedMobile;
            const credentials = await Keychain.getGenericPassword({
              service: `myKeychainService_${mobile}`,
            });
            if (credentials) {
              const { password } = credentials;
              console.log(mobile, password);
            } else {
              console.log('No item found in Keychain with Touch ID.');
            }
          }
        })
        .catch(() => {
          console.log('biometrics failed')
        })
    } catch (error) {
      console.log(error);

    }
  };

  const CheckPasswordIfNotExists = async (newPassword: any) => {
    try {
      const existingPassword = await AsyncStorage.getItem('@PasswordUser');
      if (existingPassword !== newPassword) {
        await AsyncStorage.setItem('@PasswordUser', newPassword);
        console.log('Password set successfully:', newPassword);
      } else {
        console.log('Password is the same as existing password:', existingPassword);
      }
    } catch (error) {
      console.error('Error setting password:', error);
    }
  };


  const CheckSupported = async () => {
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject
        if (available && biometryType === BiometryTypes.TouchID) {
          setcheckBiometrics('TouchID is supported')
        } else if (available && biometryType === BiometryTypes.FaceID) {
          setcheckBiometrics('FaceID is supported')
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics is supported')
        } else {
          console.log('Biometrics not supported')
        }
      })
  };

  const SaveSupported = async (newisSupported: any) => {
    try {
      const existingSupported = await AsyncStorage.getItem('@isSupported');
      if (existingSupported !== newisSupported) {
        await AsyncStorage.setItem('@isSupported', newisSupported);
        console.log('Biometrics set successfully:', newisSupported);
      } else {
        console.log('Biometrics  is the same as existing password:', existingSupported);
      }
    } catch (error) {
      console.error('Error setting Biometrics :', error);
    }
  }

  const handleSignIn = async () => {
    try {
      CheckPasswordIfNotExists(password)
      navigation.navigate("BottomScreen")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>login</Text>

        <View style={styles.inputView}>
          <Input
            title={'Phone'}
            value={mobile}
            onChange={text => setmobile(text)}
            style={undefined}
            keyboardType={'phone-pad'}
          />
          <Input
            title={'Password'}
            value={password}
            onChange={text => setpassword(text)}
            style={undefined}
            keyboardType={'default'}
            secureText
          />

          <TextButton
            text={'Forget password!'}
            style={styles.forgetPassButton}
          />

          <View style={styles.signInView}>
            <Button
              title={'Sign in'}
              style={styles.signInButton}
              onPress={() => { handleSignIn() }}
            />

            <TouchableOpacity onPress={() => handleLoginBiometrics()}>
              <Image
                source={checkBiometrics === 'TouchID is supported' ? screen.login.fingerprint : screen.login.faceid}
                style={styles.fingerprintImage}
              />
            </TouchableOpacity>
          </View>

          <TextButton text={'Sign in with Vinateks Account!'} />

          <View style={styles.registerView}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
              <TextButton text="Sign up!" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.logoText}>Vinachat</Text>
      </SafeAreaView>
    </Pressable>
  );
}
