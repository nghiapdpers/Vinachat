import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Image, SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { screen } from "../../assets/images";
import datafriend from "./data";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        setData([datafriend]);
    }, [])


    const getFirstLetters = (inputString: any) => {
        const words = inputString.trim().split(' ');
        if (words.length === 0) {
            return ''; // Chuỗi rỗng
        } else if (words.length === 1) {
            const firstLetter = words[0].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ đầu tiên và chuyển thành chữ hoa
            return firstLetter + firstLetter; // Lặp lại chữ cái đầu tiên 2 lần
        } else {
            const firstLetter = words[0].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ đầu tiên và chuyển thành chữ hoa
            const lastLetter = words[words.length - 1].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ cuối cùng và chuyển thành chữ hoa
            return firstLetter + lastLetter; // Kết hợp chữ cái đầu tiên của từ đầu tiên và từ cuối cùng
        }
    }

    const Flatlistrender = ({ item }: { item: any }) => {

        const renderFriendActive = ({ item }: { item: any }) => {
            return (
                <TouchableOpacity style={styles.viewfriendActive} onPress={() => { navigation.navigate('MessageScreen', { ref: String(item.id) }) }}>
                    <View style={styles.borderfriendActive}>
                        <Text>{getFirstLetters(item.name)}</Text>
                    </View>
                    <Text style={styles.textnameActive}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        const renderFriendMessage = ({ item }: { item: any }) => {
            console.log(item);

            return (
                <TouchableOpacity style={styles.BorderMessage} onPress={() => { navigation.navigate('MessageScreen', { ref: String(item.id) }) }}>
                    <View style={styles.MessageAvatar}>
                        <View style={styles.borderfriendActive}>
                            <Text>{getFirstLetters(item.name)}</Text>
                        </View>
                    </View>
                    <View style={styles.Message}>
                        <Text style={styles.textnameMessage}>{item.name}</Text>
                        <Text>{`You:${item.message}`}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.flatlistView}>
                <FlatList
                    data={item.active}
                    renderItem={renderFriendActive}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.createGroup}>
                    <Text style={styles.texttitleMessage}>Message</Text>
                    <TouchableOpacity>
                        <Image style={styles.createGroupIcon} source={screen.home.creategroup} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={item.message}
                    renderItem={renderFriendMessage}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>Vinachat</Text>
                <TouchableOpacity style={styles.searchBorder} onPress={() => { navigation.navigate('SearchScreen') }}>
                    <Image style={styles.searchIcon} source={screen.home.search} />
                </TouchableOpacity>
            </View>
            <View style={styles.listMessage}>
                <FlatList
                    data={data}
                    renderItem={Flatlistrender}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}