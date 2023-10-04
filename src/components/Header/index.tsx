import { Image, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const Header = ({ Iconback, text, status, IconOption1, IconOption2, IconOption3, title }: any) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexboxBackText}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={styles.iconHeader} source={Iconback} />
                </TouchableOpacity>
                <View style={{marginLeft : 5}}>
                    <Text style={styles.Username}>{text}</Text>
                    <Text style={styles.textActive}>{status}</Text>
                </View>
            </View>
            <View style={styles.flexboxTitle}>
                <Text style={styles.textTitle}>{title}</Text>
            </View>
            <View style={styles.flexboxOption}>
                <TouchableOpacity>
                    <Image style={styles.iconHeader} source={IconOption1} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.iconHeader} source={IconOption2} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.iconHeader} source={IconOption3} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Header);
