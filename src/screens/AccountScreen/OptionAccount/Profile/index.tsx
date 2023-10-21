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
import { useSelector } from 'react-redux';
import mainTheme from '../../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import apiFriendRequest from '../../../../apis/apiFriendRequest';
import apiSearch from '../../../../apis/apiSearch';


export default function ProfileScreen({ route }: { route: any }) {
    const item = route?.params?.item;
    const user = useSelector((state: any) => state?.user);
    const userExternal = useSelector((state: any) => state?.userExternal);
    const datafriend = useSelector((state: any) => state?.friendlist?.friendlist?.data?.data,);
    const navigation = useNavigation();
    const [status, setStatus] = useState('');



    const convertStatus = (status: any) => {
        switch (status) {
            case 'R':
                return `Đã gửi lời mời`;
            case 'F':
                return `Bạn bè`;
            case 'N':
                return `Gửi kết bạn`;
            case 'ID':
                return `Gửi kết bạn`;
        }
    }

    const convertIconStatus = (status: any) => {
        switch (status) {
            case 'R':
                return screen.profile.friendrequested;
            case 'F':
                return screen.profile.friend;
            case 'N':
                return screen.profile.addfriend;
            case 'ID':
                return screen.profile.addfriend;
        }
    }

    const convertGenderStatus = (status: any) => {
        switch (status) {
            case '0':
                return 'Nữ';
            case '1':
                return 'Nam';
        }
    }

    const data = [
        {
            id: 1,
            title: 'Tên người dùng',
            value: item?.ref === undefined ? userExternal?.data?.nickname || user?.data?.nickname : item?.nickname,
            icon: screen.profile.signature
        },
        {
            id: 2,
            title: 'Số điện thoại',
            value: item?.ref === undefined ? userExternal?.data?.mobile || user?.data?.mobile : item?.mobile,
            icon: screen.profile.phone
        },
        {
            id: 3,
            title: 'Email',
            value: item?.ref === undefined ? userExternal?.data?.email || user?.data?.email : item?.email,
            icon: screen.profile.email
        },
        {
            id: 4,
            title: 'Giới tính',
            value: item?.ref === undefined ? convertGenderStatus(userExternal?.data?.gender) || convertGenderStatus(user?.data?.gender) : convertGenderStatus(item?.gender),
            icon: screen.profile.sex
        },
        {
            id: 5,
            title: 'Ngày sinh',
            value: item?.ref === undefined ? userExternal?.data?.birthday || user?.data?.birthday : item?.birthday,
            icon: screen.profile.birthday
        },

    ]

    const handleFriendRequest = async () => {
        try {
            return await apiFriendRequest({ ref: item?.ref }).then((response: any) => {
                console.log(response);
                setStatus(response?.status)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(status);
    }, [status])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header3
                    text={'Trang cá nhân'}
                />
                <TouchableOpacity style={styles.potisionMore}>
                    <Image style={styles.imagemore} source={screen.profile.more} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.headerprofile}>
                        <View style={styles.borderheaderprofile}>
                            <View style={styles.flexboxheader}>
                                <View style={styles.boderavatar}>
                                    <Image style={styles.converAvatar}
                                        source={user?.data?.gender === '1' || userExternal?.data?.gender === '1'
                                            ? screen.profile.usermale
                                            : screen.profile.userfemale} />
                                </View>
                            </View>
                            <View style={styles.flexboxinfo}>
                                <View style={styles.flexboxInfoHeader}>
                                    <Text style={styles.textName}>{
                                        item?.ref === undefined
                                            ?
                                            userExternal?.data?.fullname || user?.data?.fullname
                                            :
                                            item?.fullname
                                    }</Text>
                                </View>
                                <View style={styles.FlexStatusInfo}>
                                    <View style={styles.ViewStatus}>
                                        <TouchableOpacity style={[styles.statusborder, { backgroundColor: item?.status === 'F' ? '#e3e3e3' : mainTheme.lowerFillLogo }]}
                                            onPress={() => { item?.ref === undefined ? navigation.navigate('EditUserScreen') : handleFriendRequest() }}
                                        >
                                            <View style={styles.viewbtnstatus1}>
                                                <Image style={styles.imagestatus}
                                                    source={item?.ref === undefined ? screen.profile.edituser : convertIconStatus(status === '' ? item?.status : status)} />
                                            </View>
                                            <View style={styles.viewbtnstatus2}>
                                                <Text style={styles.textStatus}>{item?.ref === undefined ? `Chỉnh sửa hồ sơ` : convertStatus(status === '' ? item?.status : status)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.ViewOption}>
                                        {item?.ref === undefined ? (
                                            <View style={styles.allfriend}>
                                                <Text style={styles.textallfriend}>{`${datafriend?.length} bạn bè`}</Text>
                                            </View>
                                        ) : (
                                            <TouchableOpacity style={styles.borderSendMessage}>
                                                <Image style={styles.imagechat} source={screen.profile.chat} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyprofile}>
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
                                            <Text style={styles.textdetail}>{item.value}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View >
        </SafeAreaView >
    )
}