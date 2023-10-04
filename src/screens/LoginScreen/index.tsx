import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Input from '../../components/Input';
import TextButton from '../../components/TextButton';
import Button from '../../components/Button';
import { screen } from '../../assets/images';
import { actionClearMessage, actionLoginExternalStart, actionLoginStart } from '../../redux/actions/userActions';
import LoadingOverlay from '../../components/LoadingOverlay';

export default function LoginScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state?.user);
  const userExternal = useSelector((state: any) => state?.userExternal);
  const message = useSelector((state: any) => state?.user?.login?.message);
  const messageExternal = useSelector((state: any) => state?.userExternal?.login?.message);
  const loading = useSelector((state: any) => state.user?.loading);
  const loadingExternal = useSelector((state: any) => state.userExternal?.loading);

  const [isPhone, setIsPhone] = useState('');
  const [isPassword, setIsPassword] = useState('');

  // console.log('userLogin:>>', user);
  // console.log('userExternalLogin:>>', userExternal);
  // console.log('message:>>', message);
  // console.log('messageExternal:>>', messageExternal);

  // Đăng nhập Default
  const handleLogin = () => {
    if (!isPhone || !isPassword) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    // Gọi action đang nhập
    dispatch(actionLoginStart(isPhone, isPassword));
  };

  // Đăng nhập với tài khoản Vinateks
  const handleLoginWithExternal = () => {
    if (!isPhone || !isPassword) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    // Gọi action đang nhập
    dispatch(actionLoginExternalStart(isPhone, isPassword));
  }

  useEffect(() => {
    if (message == 'success') {
      navigation.navigate('BottomScreen')
      return;
    }

    if (message && message != 'success') {
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

  useEffect(() => {
    if (messageExternal && messageExternal == 'success') {
      navigation.navigate('BottomScreen')
      return;
    }

    if (messageExternal && messageExternal == 'unlinked account') {
      navigation.navigate('CreateAccount')
      dispatch(actionClearMessage);
    }
    else if (messageExternal && messageExternal != 'unlinked account') {
      Alert.alert('Thông báo', messageExternal, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(actionClearMessage);
          },
        },
      ]);
    }

  }, [messageExternal])

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <LoadingOverlay visible={loading || loadingExternal} />
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

          <TextButton text={'Forget password!'} style={styles.forgetPassButton} />

          <View style={styles.signInView}>
            <Button
              title={'Sign in'}
              style={styles.signInButton}
              onPress={() => handleLogin()}
            />
            <TouchableOpacity>
              <Image
                source={screen.login.fingerprint}
                style={styles.fingerprintImage}
              />
            </TouchableOpacity>
          </View>

          <TextButton
            onPress={() => handleLoginWithExternal()}
            text={'Sign in with Vinateks Account!'} />

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
