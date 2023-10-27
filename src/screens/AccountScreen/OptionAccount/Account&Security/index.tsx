import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    Switch
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import Header3 from '../../../../components/Header3';
import mainTheme from '../../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import ModalNotification from '../../../../components/ModalNotification';

export default function AccountSecurity() {
    const [isSwitch1, setIsSwitch1] = useState(false);
    const [isSwitch2, setIsSwitch2] = useState(false);
    const [isVisibleModal, setisVisibleModal] = useState(false);
    const navigation = useNavigation();



    const toggleSwitch1 = () => {
        if (!isSwitch1) {
            setIsSwitch1(true);
        } else {
            setIsSwitch1(false);
        }
    };

    const toggleSwitch2 = () => {
        if (!isSwitch2) {
            setIsSwitch2(true);

        } else {
            setIsSwitch2(false);
        }
    };

    const dataAccount = [
        {
            id: 1,
            title: 'Đổi số điện thoại'
        },
        {
            id: 2,
            title: 'Đổi mật khẩu',
            navigation: 'ChangePassword'
        },
        {
            id: 3,
            title: 'Tắt trạng thái hoạt động'
        },
        {
            id: 4,
            title: 'Xác thực tài khoản',
            navigation: 'VerifyAccount'
        },
        {
            id: 5,
            title: 'Xoá tài khoản'
        }
    ]

    const dataSecurity = [
        {
            id: 1,
            title: 'Quản lý thiết bị đăng nhập'
        },
        {
            id: 2,
            title: 'Xác thực 2 lớp'
        },
        {
            id: 3,
            title: 'Khoá tài khoản'
        },

    ]


    const renderAccount = (item: any) => {
        if (item.id === 3) {
            return (
                <View key={item.id} style={styles.viewborderSwitch}>
                    <Text style={styles.textoption}>{item.title}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: mainTheme.lowerFillLogo }}
                        thumbColor={isSwitch1 ? mainTheme.logo : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch1}
                        value={isSwitch1}
                        style={styles.switch}
                    />
                </View>
            )
        } else {
            return (
                <TouchableOpacity key={item.id} style={styles.viewborder} onPress={() => {
                    if (item.id === 2 || item.id === 4) {
                        navigation.navigate(item.navigation)
                    } else {
                        setisVisibleModal(true);
                    }
                }}>
                    <Text style={styles.textoption}>{item.title}</Text>
                    <Image style={styles.imageborder} source={component.header.back} />
                </TouchableOpacity>
            )
        }
    }

    const renderSecurity = (item: any) => {
        if (item.id === 3) {
            return (
                <View key={item.id} style={styles.viewborderSwitch}>
                    <Text style={styles.textoption}>{item.title}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: mainTheme.lowerFillLogo }}
                        thumbColor={isSwitch2 ? mainTheme.logo : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch2}
                        value={isSwitch2}
                        style={styles.switch}
                    />
                </View>
            )
        } else {
            return (
                <TouchableOpacity key={item.id} style={styles.viewborder} onPress={() => { setisVisibleModal(true) }}>
                    <Text style={styles.textoption}>{item.title}</Text>
                    <Image style={styles.imageborder} source={component.header.back} />
                </TouchableOpacity>
            )
        }
    }

    return (
        <SafeAreaView style={[styles.container,
        {
            opacity: isVisibleModal === true ? 0.3 : 1
        }]}>
            <View style={styles.header}>
                <Header3
                    text={'Tài khoản và bảo mật'}
                />
            </View>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Tài khoản</Text>
                </View>
                {dataAccount.map((item: any) => {
                    return (renderAccount(item));
                })}
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Bảo mật</Text>
                </View>
                {dataSecurity.map((item: any) => {
                    return (renderSecurity(item));
                })}
            </ScrollView>
            <ModalNotification
                isVisible={isVisibleModal}
                setisVisible={setisVisibleModal}
                text={'Tính năng đang phát triển'}
            />
        </SafeAreaView>
    )
}