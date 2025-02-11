import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import styles from './styles';
import Input from '../../components/Input';
import TextButton from '../../components/TextButton';
import Button from '../../components/Button';
import {screen} from '../../assets/images';
import {
  actionClearMessage,
  actionLoginExternalStart,
  actionLoginStart,
} from '../../redux/actions/userActions';
import LoadingOverlay from '../../components/LoadingOverlay';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import {User} from 'realm/dist/bundle';
import {actionClearGroupChat} from '../../redux/actions/listGroupChat';
import {getData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state?.user);
  const message = useSelector((state: any) => state?.user?.login?.message);

  const loading = useSelector((state: any) => state.user?.loading);

  const [isPhone, setIsPhone] = useState('');
  const [isPassword, setIsPassword] = useState('');

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const [checkBiometrics, setcheckBiometrics] = useState('');

  useEffect(() => {
    CheckSupported();
    SaveSupported(checkBiometrics);
  }, [checkBiometrics]);

  const handleLoginBiometrics = async () => {
    try {
      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm biometrics'})
        .then(async (resultObject: any) => {
          const storedMobile: any = await AsyncStorage.getItem(
            '@UserRegisted_Biometrics',
          );
          console.log('Respose biometrics', resultObject);
          if (storedMobile) {
            const mobile = storedMobile;
            console.log(mobile);
            const credentials = await Keychain.getGenericPassword({
              service: `myKeychainService_${mobile}`,
            });
            if (credentials) {
              const {password} = credentials;
              // Gọi action đang nhập
              CheckPasswordIfNotExists(password);
              if (resultObject.success === true) {
                const fcmToken = await getData(LOCALSTORAGE.fcmToken);

                dispatch(actionLoginStart(mobile, password, fcmToken));
              } else {
                console.log('Biometric undefined');
              }
            } else {
              console.log('No item found in Keychain with Touch ID.');
            }
          }
        })
        .catch(err => {
          console.log('biometrics failed', err);
        });
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
        console.log(
          'Password is the same as existing password:',
          existingPassword,
        );
      }
    } catch (error) {
      console.error('Error setting password:', error);
    }
  };

  const CheckSupported = async () => {
    rnBiometrics.isSensorAvailable().then((resultObject: any) => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        setcheckBiometrics('TouchID is supported');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setcheckBiometrics('FaceID is supported');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
      } else {
        console.log('Biometrics not supported');
      }
    });
  };

  const SaveSupported = async (newisSupported: any) => {
    try {
      const existingSupported = await AsyncStorage.getItem('@isSupported');
      if (existingSupported !== newisSupported) {
        await AsyncStorage.setItem('@isSupported', newisSupported);
        console.log('Biometrics set successfully:', newisSupported);
      } else {
        console.log(
          'Biometrics  is the same as existing password:',
          existingSupported,
        );
      }
    } catch (error) {
      console.error('Error setting Biometrics :', error);
    }
  };

  // Đăng nhập Default
  const handleLogin = async () => {
    if (!isPhone || !isPassword) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    const fcmToken = await getData(LOCALSTORAGE.fcmToken);
    // Gọi action đang nhập
    dispatch(actionLoginStart(isPhone, isPassword, fcmToken));
    // navigation.navigate('BottomScreen')
    CheckPasswordIfNotExists(isPassword);
  };

  // Đăng nhập với tài khoản Vinateks
  const handleLoginWithExternal = () => {
    if (!isPhone || !isPassword) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    // Gọi action đang nhập
    CheckPasswordIfNotExists(isPassword);
    dispatch(actionLoginExternalStart(isPhone, isPassword));
  };

  useEffect(() => {
    if (message == 'success') {
      setIsPhone('');
      setIsPassword('');
      // navigation.dispatch(StackActions.replace('BottomScreen'));
    }

    if (message == 'unlinked account') {
      navigation.navigate('CreateAccount', {data: user.data});
      dispatch(actionClearMessage);
    }

    if (message && message != 'success' && message != 'unlinked account') {
      Alert.alert('Thông báo', message, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(actionClearMessage);
          },
        },
      ]);
    }
  }, [message]);

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <LoadingOverlay visible={loading} />
        <Text style={styles.title}>login</Text>
        <View style={styles.inputView}>
          <Input
            title={'Phone'}
            value={isPhone}
            onChange={(text: any) => setIsPhone(text)}
            keyboardType={'phone-pad'}
          />
          <Input
            title={'Password'}
            value={isPassword}
            onChange={(text: any) => setIsPassword(text)}
            keyboardType={'default'}
            secureText={true}
          />

          <TextButton
            text={'Forget password!'}
            style={styles.forgetPassButton}
          />

          <View style={styles.signInView}>
            <Button
              title={'Sign in'}
              style={styles.signInButton}
              onPress={() => handleLogin()}
            />

            <TouchableOpacity onPress={() => handleLoginBiometrics()}>
              <Image
                source={
                  checkBiometrics === 'TouchID is supported' ||
                  checkBiometrics === 'Biometrics is supported'
                    ? screen.login.fingerprint
                    : screen.login.faceid
                }
                style={styles.fingerprintImage}
              />
            </TouchableOpacity>
          </View>

          <TextButton
            onPress={() => handleLoginWithExternal()}
            text={'Sign in with Vinateks Account!'}
          />

          <View style={styles.registerView}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TextButton
              onPress={() => navigation.navigate('SignUp')}
              text="Sign up!"
            />
          </View>
        </View>
        <Text style={styles.logoText}>Vinachat</Text>
      </SafeAreaView>
    </Pressable>
  );
}
