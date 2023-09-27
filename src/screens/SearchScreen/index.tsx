import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Image, SafeAreaView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { screen, component } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewBack} onPress={() => { navigation.goBack() }}>
                    <Image style={styles.searchIcon} source={component.header.back} />
                </TouchableOpacity>
                <View style={styles.searchBorder}>
                    <TouchableOpacity style={styles.flexboxsearchIcon}>
                        <Image style={styles.searchIcon} source={screen.home.search} />
                    </TouchableOpacity>
                    <View style={styles.flexboxInput}>
                        <TextInput style={styles.Textinput} placeholder="Search..." />
                    </View>
                    <TouchableOpacity style={styles.flexboxsearchIcon} onPress={() => {navigation.navigate('ScanQrCode')}}>
                        <Image style={styles.searchIcon} source={screen.home.qrcode} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}