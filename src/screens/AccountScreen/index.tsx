import { SafeAreaView, Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Header from "../../components/Header";
import { component, screen } from "../../assets/images";


const datauser = [
    {
        id: 1,
        icon: screen.account.profile,
        title: 'Trang cá nhân',
        description: 'Xem trang cá nhân của bạn'
    },
    {
        id: 2,
        icon: screen.account.encrypted,
        title: 'Tài khoản và bảo mật',
        description: ''
    },
    {
        id: 3,
        icon: screen.account.padlock,
        title: 'Quyền riêng tư ',
        description: ''
    }
]


export default function AccountScreen() {


    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity style={styles.BorderOption}>
                <View style={styles.FlexboxIcon}>
                    <Image style={{ width: 30, height: 30 }} source={item.icon} />

                </View>
                <View style={styles.FlexboxTitle}>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    {item.description === '' ? null : (
                        <Text style={styles.textdescription}>{item.description}</Text>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topAccount}>
                <View style={styles.headerTopAccount}>
                    <View style={styles.AvatarUserFlexbox}>
                        <View style={styles.AvatarUser}>
                        </View>
                    </View>
                    <View style={styles.NameUserFlexbox}>
                        <Text style={styles.UserName}>ngtrthinh</Text>
                        <Text style={styles.fullnameUser}>Nguyễn Trung Thịnh</Text>
                    </View>
                </View>
                <View style={styles.bodyTopAccount}>
                        <Text style={styles.textBio}>Chun Thịnh nè</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkAccount}>https://github.com/nghiapdpers/Vinachat.git</Text>
                        </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bodyAccount}>
                <FlatList
                    data={datauser}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    )
}