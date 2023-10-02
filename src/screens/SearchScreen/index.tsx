import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Image, SafeAreaView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { screen, component } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mainTheme from "../../assets/colors";

export default function SearchScreen() {
    const navigation = useNavigation();
    const [value, setvalue] = useState('');
    const [data, setData] = useState([]);

    const FetchSearch = async () => {
        try {
            AsyncStorage.getItem('@apikey', async (error: any, data: any) => {
                return await axios.post('http://127.0.0.1:5003/api/user/search', { keyword: value }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + data,
                    },
                    timeout: 20000
                }).then((resposne: any) => {
                    setData(resposne.data.data)
                })
            })

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        FetchSearch()        
    }, [value])

    const renderItem = ({ item }: { item: any }) => {        
        return (
            <View style={styles.borderFind}>
                <View style={styles.topItem}>
                    <View style={styles.imageItem}>

                    </View>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={styles.textItemName}>{item?.fullname}</Text>
                    <Text style={styles.mobile}>{item?.mobile}</Text>
                </View>
                <View style={styles.endItem}>
                    <TouchableOpacity style={[styles.btnstatusfriend , {backgroundColor : item?.isFriend === false ? mainTheme.logo : '#e3e3e3'}]}>
                        <Text>{item?.isFriend === false ? 'Kết bạn' : 'Đã kết bạn'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewBack} onPress={() => { navigation.goBack() }}>
                    <Image style={styles.searchIcon} source={component.header.back} />
                </TouchableOpacity>
                <View style={styles.searchBorder}>
                    <TouchableOpacity style={styles.flexboxsearchIcon} onPress={() => { FetchSearch() }}>
                        <Image style={styles.searchIcon} source={screen.home.search} />
                    </TouchableOpacity>
                    <View style={styles.flexboxInput}>
                        <TextInput
                            style={styles.Textinput}
                            placeholder="Search..."
                            value={value}
                            onChangeText={text => setvalue(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.flexboxsearchIcon} onPress={() => { navigation.navigate('ScanQrCode') }}>
                        <Image style={styles.searchIcon} source={screen.home.qrcode} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ViewFind}>
                <FlatList
                    data={[data]}
                    renderItem={data !== undefined ? renderItem : null}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}