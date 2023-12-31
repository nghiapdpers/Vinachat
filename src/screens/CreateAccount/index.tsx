import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Alert} from 'react-native';
import styles from './styes';
import mainTheme from '../../assets/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  actionClearUser,
  actionRegisterStart,
} from '../../redux/actions/userActions';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const {phone, data}: any = route?.params || {};

  const isRegisted = useSelector((state: any) => state?.user?.register?.status);
  const message = useSelector((state: any) => state?.user?.register?.message);

  const [isChecked, setIsChecked] = useState(false);
  const [isPhone, setIsPhone] = useState(data ? data?.mobile : phone);
  const [isFullName, setIsFullName] = useState(data ? data?.fullname : '');
  const [isPassword, setIsPassword] = useState('');

  // Get vinateks_id từ route
  const vid = data?.vinateks_id ? data?.vinateks_id : '';

  // console.log('userLogin:>>', user);
  // console.log('userExternalLogin:>>', userExternal);
  // console.log('dataUserExternal:>>', dataUserExternal);

  // console.log('isPhone:>>', isPhone);
  // console.log('isFullName:>>', isFullName);
  // console.log('isPassword:>>', isPassword);
  // console.log('vid:>>', vid);

  // Check Agree with Terms and Conditions
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  // handle Register with button
  const Register = () => {
    if (!isFullName || !isPhone || !isPassword) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (isPassword?.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải từ 6 kí tự trở lên.');
      return;
    }
    if (!isChecked) {
      Alert.alert('Thông báo', 'Bạn chưa đồng ý với điều khoản dịch vụ.');
      return;
    }
    dispatch(actionRegisterStart(isPhone, isFullName, isPassword, vid));
    setIsFullName('');
    setIsPhone('');
    setIsPassword('');
  };

  useEffect(() => {
    if (isRegisted) {
      // navigation.dispatch(StackActions.replace('BottomScreen'));
      return;
    }

    if (message) {
      Alert.alert('Thông báo', message.message, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(actionClearUser);
            navigation.goBack();
          },
        },
      ]);
    }
  }, [isRegisted, message]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Input
        onChange={(text: string) => setIsPhone(text)}
        value={isPhone}
        style={{marginTop: 16}}
        title="Phone Number"
        keyboardType="number-pad"
        disableInput={false}
      />

      <Input
        style={{marginTop: 16}}
        title="Full Name"
        keyboardType="default"
        value={isFullName}
        onChange={(text: string) => setIsFullName(text)}
        secureText={false}
      />

      <Input
        style={{marginTop: 16}}
        title="Password"
        keyboardType="default"
        secureText={true}
        value={isPassword}
        onChange={(text: string) => setIsPassword(text)}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 16,
          justifyContent: 'center',
        }}>
        <CheckBox status={isChecked} handleChecked={toggleCheckBox} />
        <Text style={{fontSize: 16, color: mainTheme.text, marginLeft: 8}}>
          I agree with Terms and Conditions
        </Text>
      </View>

      <Button
        styleText={{}}
        disable={false}
        title="Register"
        onPress={() => Register()}
        style={{marginTop: 16}}
      />
    </SafeAreaView>
  );
};

export default React.memo(CreateAccount);
