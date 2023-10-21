import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles";
import { component } from "../../assets/images";

const BottomSheetTypeList = ({ data }: any) => {


    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.viewrender} >
                <View style={styles.ViewInfo}>
                    <Text style={styles.textname}>{item.name}</Text>
                    <Text style={styles.textmobile}>{item.mobile}</Text>
                </View>
                <TouchableOpacity style={styles.viewSelection} onPress={() => { }}>
                    <Text>Huỷ chặn</Text>
                </TouchableOpacity>
            </View >
        )
    }



    return (
        <View style={styles.container}>
            {data === null ? (
                <Image style={styles.imageNullItem} source={component.bottomsheet.block} />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    )
}

export default React.memo(BottomSheetTypeList);