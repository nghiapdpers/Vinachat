import { View, FlatList, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles";

const BottomSheetTypeSelection = ({ data }: any) => {
    const [selected, setSelected] = useState(null);

    const handleSelected = (value: any) => {
        setSelected(value);
    }
    const renderItem = ({ item }: { item: any }) => {
        const isSelected = item.id === selected;
        return (
            <View style={styles.viewrender}>
                <Text style={styles.textSelection}>{item.title}</Text>
                <TouchableOpacity style={styles.viewSelection} onPress={() => { handleSelected(item.id) }}>
                    {/* {item.status === 'selected' ? (
                        <View style={styles.Selected} />
                    ) : null} */}
                    {isSelected ? (
                        <View style={styles.Selected} />
                    ) : null}
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default React.memo(BottomSheetTypeSelection);