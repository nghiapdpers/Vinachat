import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StatusBar,
    Modal,
    View,
    Alert,
    TouchableOpacity,
} from 'react-native';
import styles from './styes';
import mainTheme from '../../assets/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import OtpInputs from 'react-native-otp-inputs';
import { useNavigation } from '@react-navigation/native';



const SignUp = () => {

    const navigation = useNavigation()

    const [isSendingOTP, setIsSendingOTP] = useState(false);
    const [isPhone, setIsPhone] = useState('');
    const [isShowCODE, setIsShowCODE] = useState(false);
    const [otp, setOtp] = useState('');
    const [isSecond, setIsSecond] = useState(59);
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | any>(null);

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber: string) {
        const formattedPhoneNumber = `+84${phoneNumber.replace(/\D/g, '')}`;
        try {
            const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
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
            setIsSendingOTP(true)
            // Send OTP
            await signInWithPhoneNumber(phone);

            setIsShowCODE(true)
        } catch (error) {
            console.warn('Error sending OTP:', error);
            Alert.alert('Thông báo', 'Lỗi khi gửi mã OTP');
        } finally {
            setIsSendingOTP(false)
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
                setIsPhone('')
            } catch (error) {
                console.log('error:>>', error);
                Alert.alert('Thông báo', 'Mã OTP không đúng. Vui lòng kiểm tra lại.')
            }
        } else {
            console.log('Confirmation đang null');
        }
    }


    // Gửi lại mã OTP
    const resendOTP = async (phone: string) => {
        try {
            // Send OTP
            await signInWithPhoneNumber(phone);
        } catch (error) {
            console.log('Error sending OTP:', error);
            Alert.alert('Thông báo', 'Lỗi khi gửi mã OTP');
        };
    }

    // Hàm giảm giá trị của isSecond sau mỗi giây
    useEffect(() => {
        const timer = setInterval(() => {
            if (isSecond > 0 && isShowCODE) {
                setIsSecond(isSecond - 1);
            }
        }, 1000);

        // Xóa bộ đếm khi isSecond đạt 0
        return () => clearInterval(timer);
    }, [isSecond, isShowCODE]);

    // Hàm để hiển thị isSecond với số 0 ở trước nếu nhỏ hơn 10
    const formatSecond = () => {
        if (isSecond < 10) {
            return `0${isSecond}`;
        }
        return isSecond.toString();
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
                hardwareAccelerated
            >
                <View style={styles.modalContainer}>
                    <View style={styles.centeredView}>

                        <Text style={styles.modalTitle}>
                            Fill OTP code is sent to your number phone
                        </Text>

                        <OtpInputs
                            autofillFromClipboard={false}
                            numberOfInputs={6}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 16 }}
                            inputContainerStyles={{ backgroundColor: '#FFFFFF', marginHorizontal: 4, }}
                            inputStyles={{ fontSize: 22, textAlign: 'center' }}
                            keyboardType='phone-pad'
                            handleChange={(code) => {
                                setOtp(code)
                            }}
                        />

                        <View style={{ width: '100%', marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {isSecond === 0 ? null :
                                (<Text style={{ color: mainTheme.logo, fontSize: 16 }}>0:{formatSecond()}</Text>)
                            }
                            <TouchableOpacity
                                disabled={isSecond === 0 ? false : true}
                                onPress={() => {
                                    if (isSecond === 0) {
                                        resendOTP(isPhone)
                                    }
                                }}>
                                <Text style={[styles.textResentOTP, isSecond === 0 ? { color: mainTheme.logo } : { color: '#C2C2C2' }]}>Gửi lại mã OTP</Text>
                            </TouchableOpacity>
                        </View>


                        <Button
                            disable={false}
                            onPress={() => verifyCode()}
                            style={{ position: 'absolute', bottom: 16 }}
                            title="Verify"
                        />
                    </View>
                </View>
            </Modal>

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
                value={isPhone}
                onChange={(text: string) => setIsPhone(text)}
                keyboardType="phone-pad"
            />

            <Button
                title={isSendingOTP ? 'Send OTP ...' : 'Send OTP'}
                onPress={() =>
                    sendOTP(isPhone)
                }
                style={{ marginTop: 16 }}
                disable={isSendingOTP}
            />

        </SafeAreaView >
    );
};

export default React.memo(SignUp);
