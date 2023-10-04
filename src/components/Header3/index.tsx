import { Image, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { component } from "../../assets/images";

const Header3 = ({ Iconback, text }: any) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.potisionImage} onPress={() => { navigation.goBack() }}>
                <Image style={styles.image} source={component.header.back} />
            </TouchableOpacity>
            <Text style={styles.texttitle}>{text}</Text>
        </SafeAreaView>
    )
}

export default React.memo(Header3);
