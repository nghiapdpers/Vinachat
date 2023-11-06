import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import Header3 from '../../../../components/Header3';
import { useDispatch, useSelector } from 'react-redux';
import mainTheme from '../../../../assets/colors';
import { useNavigation } from '@react-navigation/native';

export default function VerifyAccount() {
    const navigation = useNavigation();
    const data = [
        {
            id: 1,
            title: 'Nhanh chóng bảo vệ tài khoản khỏi sự cố bảo mật'
        },
        {
            id: 2,
            title: 'Tăng giới hạn thành viên nhóm lên 1000 người'
        },
        {
            id: 3,
            title: 'Khám các tính năng đặc biệt mới sắp ra mắt'
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header3
                    text={'Xác thực tài khoản'}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.viewbanner}>
                    <Image style={styles.imagebanner} source={screen.verifyaccount.banner} />
                </View>
                <View style={styles.viewtitle}>
                    <Text style={styles.texttitle}>Xác thực tài khoản giúp bạn : </Text>
                </View>
                <View style={styles.InfoVerify}>
                    {data.map((item: any) => (
                        <View key={item.id} style={styles.viewflexInfo}>
                            <Image style={styles.imageicon} source={screen.verifyaccount.iconverify} />
                            <Text style={styles.fonttext}>{item.title}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.submitStart}>
                    <TouchableOpacity style={styles.bordersubmit} onPress={() => { navigation.navigate('MultiStepVerify') }}>
                        <Text style={styles.textsubmit}>Bắt đầu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}