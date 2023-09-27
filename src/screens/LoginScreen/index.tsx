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

export default function LoginScreen() {
  const navigation = useNavigation();
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
            value={undefined}
            onChange={undefined}
            style={undefined}
            keyboardType={'phone-pad'}
          />
          <Input
            title={'Password'}
            value={undefined}
            onChange={undefined}
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
              onPress={() => { navigation.navigate('BottomScreen') }}
            />

            <TouchableOpacity>
              <Image
                source={screen.login.fingerprint}
                style={styles.fingerprintImage}
              />
            </TouchableOpacity>
          </View>

          <TextButton text={'Sign in with Vinateks Account!'} />

          <View style={styles.registerView}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('SignUp')}}>
              <TextButton text="Sign up!" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.logoText}>Vinachat</Text>
      </SafeAreaView>
    </Pressable>
  );
}
