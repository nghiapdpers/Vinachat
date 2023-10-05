import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  Modal,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import styles from './styes';
import mainTheme from '../../assets/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import OtpInputs from 'react-native-otp-inputs';

type RootStackParamList = {
  SignUp: undefined;
  CreateAccount: undefined;
};

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

const SignUp: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isPhone, setIsPhone] = useState('');
  const [isShowCODE, setIsShowCODE] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState({});

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    const formattedPhoneNumber = `+84${phoneNumber.replace(/\D/g, '')}`;
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        formattedPhoneNumber,
      );
      console.log('confirmation:>>', confirmation);
      setConfirm(confirmation); // Set the confirmation object here
    } catch (error) {
      console.warn('Error signing in with phone number:', error);
      // Handle the error here (e.g., display an error message)
    }
  }

  // Gửi sđt để nhận mã OTP
  const sendOTP = async (phone: string) => {
    if (!phone) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
      return;
    }
    if (phone?.length !== 10) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
      return;
    }
    try {
      setIsSendingOTP(true);
      // Send OTP
      await signInWithPhoneNumber(phone);

      setIsShowCODE(true);
    } catch (error) {
      console.warn('Error sending OTP:', error);
      Alert.alert('Thông báo', 'Lỗi khi gửi mã OTP');
    } finally {
      setIsSendingOTP(false);
    }
  };

  // Xác thực OTP
  const verifyCode = async () => {
    console.log('verifyOTP:>>', otp);
    console.log('confirm::>', confirm);

    if (confirm) {
      try {
        const res = await confirm.confirm(otp);
        console.log('res:>>', res);
        setIsShowCODE(false);
        navigation.navigate('CreateAccount');
        setIsPhone('');
      } catch (error) {
        Alert.alert('Thông báo', 'Mã OTP không đúng. Vui lòng kiểm tra lại.');
      }
    } else {
      console.log('Confirmation đang null');
    }
  };

  // Gửi lại mã OTP
  const resendOTP = async (phone: string) => {
    try {
      console.log('Gửi lại mã OTP');

      // Send OTP
      await signInWithPhoneNumber(phone);
    } catch (error) {
      console.log('Error sending OTP:', error);
      Alert.alert('Thông báo', 'Lỗi khi gửi mã OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent
        visible={isShowCODE}
        onRequestClose={() => {
          setIsShowCODE(false);
        }}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.modalContainer}>
          <View style={styles.centeredView}>
            <Text style={styles.modalTitle}>
              Fill OTP code is sent to your number phone
            </Text>

            <OtpInputs
              numberOfInputs={6}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: 16,
              }}
              inputContainerStyles={{
                backgroundColor: '#FFFFFF',
                marginHorizontal: 4,
              }}
              inputStyles={{fontSize: 22, textAlign: 'center'}}
              keyboardType="phone-pad"
              handleChange={code => {
                setOtp(code);
              }}
            />

            <TouchableOpacity
              onPress={() => resendOTP(isPhone)}
              style={{width: '100%', marginTop: 16}}>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 16,
                  color: mainTheme.logo,
                }}>
                Gửi lại mã xác nhận
              </Text>
            </TouchableOpacity>

            <Button
              disabled
              styleText={{}}
              onPress={() => verifyCode()}
              style={{position: 'absolute', bottom: 16}}
              title="Verify"
            />
          </View>
        </View>
      </Modal>

      <StatusBar animated={true} backgroundColor={mainTheme.background} />
      <Text style={styles.title}>Create Account</Text>
      <Input
        typePassword={false}
        style={{marginTop: 16}}
        title="Phone Number"
        value={isPhone}
        onChange={(text: string) => setIsPhone(text)}
        keyboardType="number-pad"
      />

      <Button
        styleText={{}}
        title={isSendingOTP ? 'Send OTP ...' : 'Send OTP'}
        onPress={() => sendOTP(isPhone)}
        style={{marginTop: 16}}
        disabled={isSendingOTP} // Disable the button when sending OTP
      />
    </SafeAreaView>
  );
};

export default React.memo(SignUp);
