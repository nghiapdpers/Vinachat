import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import Header3 from '../../../../components/Header3';
import { useSelector, useDispatch } from 'react-redux';
import apiUpdateProfile from '../../../../apis/apiUpdateProfile';
import { actionLoginEnd } from '../../../../redux/actions/userActions';
import { storeData } from '../../../../storage';
import { LOCALSTORAGE } from '../../../../storage/direct';
import { useNavigation } from '@react-navigation/native';
import mainTheme from '../../../../assets/colors';
import DatePicker from 'react-native-date-picker'

export default function EditUserScreen() {
    const user = useSelector((state: any) => state?.user);
    const userExternal = useSelector((state: any) => state?.userExternal);
    const [username, setUsername] = useState(userExternal?.data?.nickname || user?.data?.nickname);
    const [fullname, setFullname] = useState(userExternal?.data?.fullname || user?.data?.fullname);
    const [email, setEmail] = useState(userExternal?.data?.email || user?.data?.email);
    const [sex, setSex] = useState(userExternal?.data?.gender || user?.data?.gender);
    const [date, setDate] = useState(new Date())
    const [birthday, setBirthday] = useState(userExternal?.data?.birthday || user?.data?.birthday);
    const dispacth = useDispatch();
    const navigation = useNavigation();
    const [DateModalVisible, setDateModalVisible] = useState(false);

    const data = [
        {
            id: 1,
            title: 'Tên người dùng',
            value: username,
            onchaged: (text: any) => setUsername(text),
            icon: screen.profile.signature
        },
        {
            id: 2,
            title: 'Họ và tên',
            value: fullname,
            onchaged: (text: any) => setFullname(text),
            icon: screen.profile.fullname
        },
        {
            id: 3,
            title: 'Email',
            value: email,
            onchaged: (text: any) => setEmail(text),
            icon: screen.profile.email
        },
        {
            id: 4,
            title: 'Giới tính',
            value: sex,
            onchaged: (text: any) => setSex(text),
            icon: screen.profile.sex
        },
        {
            id: 5,
            title: 'Ngày sinh',
            value: birthday,
            onchaged: (text: any) => setBirthday(text),
            icon: screen.profile.birthday
        },
    ]

    const handleGender = (value: any) => {
        setSex(value)
        // console.log("value", value);

    }

    // useEffect(() => {
    //     console.log("sex", sex);
    //     console.log(birthday);
    // }, [sex, birthday, date])


    const FetchEditProfile = async () => {
        try {
            return await apiUpdateProfile({
                fullname: fullname,
                nickname: username,
                gender: sex,
                email: email,
                birthday: birthday
            }).then((response: any) => {
                dispacth(actionLoginEnd(response))
                storeData(LOCALSTORAGE.apikey, response?.apiKey);
                storeData(LOCALSTORAGE.user, response?.data);
                navigation.goBack()
            })
        } catch (error) {
            console.log(error);
        }
    }

    const renderEdit = (item: any) => {
        if (item.id === 5) {
            return (
                <TouchableOpacity style={styles.viewbirthday} onPress={() => setDateModalVisible(true)}>
                    <DatePicker
                        modal
                        mode='date'
                        open={DateModalVisible}
                        date={date}
                        onDateChange={setDate}
                        onConfirm={(date) => {
                            setDateModalVisible(false)
                            // Chuyển kiểu Date thành dd/mm/yyyy
                            setBirthday(date.toLocaleDateString("en-GB"))
                        }}
                        onCancel={() => {
                            setDateModalVisible(false)
                        }}
                    />
                    <Text>{birthday}</Text>
                </TouchableOpacity>
            );
        } else if (item.id === 4) {
            return (
                <View style={styles.viewbtn}>
                    <TouchableOpacity
                        style={[styles.borderbtngender, { backgroundColor: sex === '1' ? mainTheme.logo : 'transparent' }]}
                        onPress={() => { handleGender('1') }}
                    >
                        <Text>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.borderbtngender, { backgroundColor: sex === '0' ? mainTheme.logo : 'transparent' }]}
                        onPress={() => { handleGender('0') }}
                    >
                        <Text>Nữ</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <TextInput
                    style={styles.textdetail}
                    value={item.value}
                    onChangeText={item.onchaged}
                />
            );
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header3
                    text={'Chỉnh sửa thông tin'}
                />
            </View>
            <View style={styles.bodyedit}>
                {data.map((item: any) => {
                    return (
                        <View key={item.id} style={styles.viewInfo}>
                            <View style={styles.viewtitle}>
                                <Text style={styles.texttitle}>{item.title}</Text>
                            </View>
                            <View style={styles.viewdetail}>
                                <View style={styles.iconflexborderdetail}>
                                    <Image style={styles.icondetail} source={item.icon} />
                                </View>
                                <View style={styles.infoflexborderdetail}>
                                    {renderEdit(item)}
                                </View>
                            </View>
                        </View >
                    )
                })}
                <View style={styles.submit}>
                    <TouchableOpacity style={styles.borderbtn} onPress={() => { FetchEditProfile() }}>
                        <Text style={styles.btntext}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </SafeAreaView >
    )
}