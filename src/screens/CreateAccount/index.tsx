import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    Text,
    StatusBar,
    Modal,
    View,
    TextInput,
    Alert,
} from 'react-native';
import styles from './styes';
import mainTheme from '../../assets/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

type RootStackParamList = {
    SignUp: undefined;
    Friends: undefined;
};

type SignUpScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};
const CreateAccount: React.FC<SignUpScreenProps> = ({ navigation }) => {

    const { apiInit } = useSelector((state) => state.postReducers)
    console.log(apiInit);


    const [isChecked, setIsChecked] = useState(false)
    const [isFirstName, setIsFirstName] = useState('')
    const [isLastName, setIsLastName] = useState('')
    const [isPassword, setIsPassword] = useState('')

    // Check Agree with Terms and Conditions
    const toggleCheckBox = () => {
        setIsChecked(!isChecked);
    };

    const Register = () => {
        if (!isFirstName || !isLastName || !isPassword) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.')
            return;
        }
        if (!isChecked) {
            Alert.alert('Thông báo', 'Bạn chưa đồng ý với điều khoản dịch vụ.')
            return;
        }
        navigation.navigate('Friends')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={mainTheme.background}
            />

            <Text
                style={styles.title}
            >
                Create Account
            </Text>

            <Input
                style={{ marginTop: 16 }}
                title="Phone Number"
                keyboardType="number-pad"
                typePassword={false}
            />
            <Input
                style={{ marginTop: 16 }}
                title="First Name"
                keyboardType="default"
                value={isFirstName}
                onChange={(text: string) => setIsFirstName(text)}
                typePassword={false}
            />
            <Input
                style={{ marginTop: 16 }}
                title="Last Name"
                keyboardType="default"
                value={isLastName}
                onChange={(text: string) => setIsLastName(text)}
                typePassword={false}

            />
            <Input
                style={{ marginTop: 16 }}
                title="Password"
                keyboardType="default"
                typePassword={true}
                value={isPassword}
                onChange={(text: string) => setIsPassword(text)}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, justifyContent: 'center' }}>
                <CheckBox status={isChecked} handleChecked={toggleCheckBox} />
                <Text style={{ fontSize: 16, color: mainTheme.text, marginLeft: 8 }}>I agree with Terms and Conditions</Text>
            </View>

            <Button
                title="Register"
                onPress={() => Register()}
                style={{ marginTop: 16 }}
            />
        </SafeAreaView>
    );
};

export default React.memo(CreateAccount);
