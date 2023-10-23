import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    Image,
    Pressable,
    TextInput,
    Switch
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import Header3 from '../../../../components/Header3';
import mainTheme from '../../../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePassword() {
    const [password, setpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [isShownPassword, setisShownPassword] = useState(true);
    const [isShownNewPassword, setisShownNewPassword] = useState(true);
    const [isShownConfirmPassword, setisShownConfirmPassword] = useState(true);
    const [passwordWrong, setpasswordWrong] = useState(false);
    const [newpasswordWrong, setnewpasswordWrong] = useState(false);
    const [confirmpasswordWrong, setconfirmpasswordWrong] = useState(false);


    const onChangeSecureTextPassword = () => {
        setisShownPassword(!isShownPassword);
    };
    const onChangeSecureTextNewPassword = () => {
        setisShownNewPassword(!isShownNewPassword);
    };
    const onChangeSecureTextConfirmPassword = () => {
        setisShownConfirmPassword(!isShownConfirmPassword);
    };


    const data = [
        {
            id: 1,
            title: 'Mật khẩu hiện tại',
            value: password,
            onchange: (text: any) => setpassword(text),
            securetext: isShownPassword,
            imageshowhide: isShownPassword ? component.input.hidden : component.input.show,
            btnshowhide: onChangeSecureTextPassword,
            condition: passwordWrong,
            textwrongcondition: '*Mật khẩu không chính xác.'
        },
        {
            id: 2,
            title: 'Mật khẩu mới',
            value: newpassword,
            onchange: (text: any) => setnewpassword(text),
            securetext: isShownNewPassword,
            imageshowhide: isShownNewPassword ? component.input.hidden : component.input.show,
            btnshowhide: onChangeSecureTextNewPassword,
            condition: newpasswordWrong,
            textwrongcondition: '*Mật khẩu không hợp lệ , vui lòng đọc kĩ lưu ý.'
        },
        {
            id: 3,
            title: 'Xác nhận mật khẩu',
            value: confirmpassword,
            onchange: (text: any) => setconfirmpassword(text),
            securetext: isShownConfirmPassword,
            imageshowhide: isShownConfirmPassword ? component.input.hidden : component.input.show,
            btnshowhide: onChangeSecureTextConfirmPassword,
            condition: confirmpasswordWrong,
            textwrongcondition: '*Xác nhận mật khẩu không trùng khớp.'
        }
    ]

    const handleUpdatePassword = async () => {
        const formatnewpassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(newpassword);
        AsyncStorage.getItem('@PasswordUser', (error: any, passworduser: any) => {
            if (password !== passworduser) {
                setpasswordWrong(true);
            } else {
                setpasswordWrong(false);
            }
            if (!formatnewpassword && formatnewpassword !== passworduser) {
                setnewpasswordWrong(true);
            } else {
                setnewpasswordWrong(false);
            }
            if (confirmpassword !== newpassword) {
                setconfirmpasswordWrong(true);
            } else {
                setconfirmpasswordWrong(false);
            }
        });
    }


    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Header3
                        text={'Đổi mật khẩu'}
                    />
                </View>
                <View style={styles.body}>
                    {data.map((item: any) => {
                        return (
                            <View key={item.id} style={styles.border}>
                                <View style={styles.viewtitle}>
                                    <Text style={styles.texttitle}>{item.title}</Text>
                                </View>
                                <View style={[styles.borderinput, { borderColor: item.condition ? 'red' : 'black' }]}>
                                    <View style={styles.viewinput}>
                                        <TextInput
                                            style={styles.textinput}
                                            value={item.value}
                                            onChangeText={item.onchange}
                                            secureTextEntry={item.securetext}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.potisionimage} onPress={item.btnshowhide}>
                                        <Image style={styles.imagebtn} source={item.imageshowhide} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                    <View style={styles.warningview}>
                        <Text style={styles.textwarning}>
                            *Lưu ý:
                            {"\n"}
                            - Mật khẩu mới không được trùng với mật khẩu hiện tại.
                            {"\n"}
                            - Mật khẩu phải bao gồm chữ, số và kí tự đặc biệt.
                        </Text>
                    </View>
                    <View style={styles.errorview}>
                        {data.map((item: any) => {
                            return (
                                <View key={item.id} style={styles.erroritem}>
                                    {item.condition === true ? (
                                        <Text style={styles.textwrongcondition}>{item.textwrongcondition}</Text>
                                    ) : null}
                                </View>
                            )
                        })}
                    </View>
                    <View style={styles.submitview}>
                        <TouchableOpacity style={styles.submitborder} onPress={() => { handleUpdatePassword() }}>
                            <Text style={styles.textsubmit}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Pressable>
    )
}