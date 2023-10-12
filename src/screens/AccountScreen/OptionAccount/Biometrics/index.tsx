import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Switch,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../../../components/Header';
import {screen, component} from '../../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import mainTheme from '../../../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';

export default function Biometrics() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSupported, setIsSupported] = useState('');
  const [isShown, setIsShown] = useState(true);
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [animation, setanimation] = useState(false);

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const user = useSelector((state: any) => state?.user);
  const userExternal = useSelector((state: any) => state?.userExternal);
  const mobile = user?.data?.mobile
    ? user?.data?.mobile
    : userExternal?.data?.mobile;

  const onChangeSecureText = () => {
    setIsShown(!isShown);
  };

  const toggleSwitch = () => {
    if (!isEnabled) {
      setModalVisible(true);
    } else {
      setIsEnabled(false);
      deleteBiometrics();
    }
  };
  useEffect(() => {
    checkSupported();
    AsyncStorage.getItem('@PasswordUser', (error: any, data: any) => {
      setpassword(data);
    });
    loadIsBiometricsEnabled();
  }, [isSupported, password]);

  const HandleConfirmPass = async () => {
    await AsyncStorage.getItem('@PasswordUser', (error: any, password: any) => {
      if (confirmpassword === password) {
        handleBiometric();
      } else {
        setModalVisible(true);
      }
    });
  };

  const getUsernameAndPassword = async () => {
    const username = await AsyncStorage.getItem('@UserRegisted_Biometrics');
    console.log(username);
  };

  getUsernameAndPassword();

  const handleBiometric = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm biometrics'})
      .then(async (resultObject: any) => {
        const {success} = resultObject;
        if (success) {
          await Keychain.setGenericPassword(mobile, password, {
            service: `myKeychainService_${mobile}`,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          });
          await AsyncStorage.setItem(
            `@isEnabled_${mobile}`,
            JSON.stringify(true),
          );
          await AsyncStorage.setItem(`@UserRegisted_Biometrics`, mobile);
          setanimation(true);
          setTimeout(() => {
            setanimation(false);
            setModalVisible(false);
            setIsEnabled(true);
            setModalVisible(false);
          }, 5500);
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  const loadIsBiometricsEnabled = async () => {
    try {
      const storedMobile: any = await AsyncStorage.getItem(
        '@UserRegisted_Biometrics',
      );
      if (storedMobile && storedMobile !== mobile) {
        setIsEnabled(false);
        await deleteBiometrics();
      } else {
        const isEnabledString = await AsyncStorage.getItem(
          `@isEnabled_${mobile}`,
        );
        if (isEnabledString !== null) {
          setIsEnabled(JSON.parse(isEnabledString));
        }
      }
    } catch (error) {
      console.log('Error loading isTouchIDEnabled from AsyncStorage:', error);
    }
  };

  const deleteBiometrics = async () => {
    try {
      await Keychain.resetGenericPassword({
        service: `myKeychainService_${mobile}`,
      });
      await AsyncStorage.removeItem(`@isEnabled_${mobile}`);
      console.log('Touch ID data removed from Keychain and AsyncStorage.');
    } catch (error) {
      console.log('Error deleting Touch ID data:', error);
    }
  };

  const checkSupported = async () => {
    try {
      await AsyncStorage.getItem('@isSupported', (fail: any, response: any) => {
        setIsSupported(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header
          Iconback={component.header.back}
          text={''}
          status={''}
          IconOption1={null}
          IconOption2={null}
          IconOption3={null}
          title={'Xác thực'}
        />
      </View>
      <View style={styles.EnableBorder}>
        <View style={styles.FlexBorder}>
          <Text style={styles.text}>
            Xác thực{' '}
            {isSupported === 'FaceID is supported' ? 'FaceID' : 'TouchID'}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: mainTheme.lowerFillLogo}}
            thumbColor={isEnabled ? mainTheme.logo : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <KeyboardAvoidingView
          style={styles.Modalcontainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.Modalcontainer}>
            <View style={styles.BorderModal}>
              <View style={styles.flextopModal}>
                <Text style={styles.titleModal}>Nhập mật khẩu để xác thực</Text>
              </View>
              {animation === true ? (
                <View style={styles.ViewAnimation}>
                  <LottieView
                    source={
                      isSupported === 'FaceID is supported'
                        ? require('../../../../assets/lottiefile/biometrics/faceid.json')
                        : require('../../../../assets/lottiefile/biometrics/touchid.json')
                    }
                    style={{width: 100, height: 100}}
                    autoPlay
                    loop
                  />
                </View>
              ) : (
                <>
                  <View style={styles.flexbodyModal}>
                    <View style={styles.borderInputpass}>
                      <TextInput
                        style={styles.textinput}
                        placeholder="Password..."
                        secureTextEntry={isShown}
                        value={confirmpassword}
                        onChangeText={text => setconfirmpassword(text)}
                      />
                      <TouchableOpacity
                        style={styles.hiddenButton}
                        onPress={onChangeSecureText}>
                        <Image
                          source={
                            isShown
                              ? component.input.hidden
                              : component.input.show
                          }
                          style={styles.hiddenImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.flexboxbottomModal}>
                    <TouchableOpacity
                      style={styles.borderbtn}
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      <Text style={styles.textbtnModal}>Huỷ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.borderbtn}
                      onPress={() => {
                        HandleConfirmPass();
                      }}>
                      <Text style={styles.textbtnModal}>Xác nhận</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
