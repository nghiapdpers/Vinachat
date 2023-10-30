import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    Switch,
    ImageBackground
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import mainTheme from '../../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import Header3 from '../../../../components/Header3';
import { useSelector } from 'react-redux';

export default function MemberInGroups() {
    const listmember = useSelector((s: any) => s.detailGroup.members);

    const renderItem = ({ item }: { item: any }) => {


        return (
            <View style={styles.borderItem}>
                <View style={styles.ImageFlex}>
                    {item.avatar ? (
                        <Image source={{ uri: item.avatar }} style={styles.imageItem} />
                    ) : (
                        <View style={styles.imageItem}></View>
                    )}
                </View>
                <View style={styles.NameFlex}>
                    <Text style={styles.textnameItem}>{item.fullname}</Text>
                    <Text style={styles.textactive}>{item.mobile}</Text>
                </View>
                <Text style={styles.role}>{item.role}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header3
                    text={`Thành viên(${listmember.length})`}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.ViewListMember}>
                    <FlatList
                        data={listmember}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}