import React from "react"
import { View, TouchableOpacity } from "react-native"
import styles from "./styles"

const CheckBox = ({ status, handleChecked }: { status: boolean, handleChecked: any }) => {
    return (
        <TouchableOpacity onPress={handleChecked} style={styles.container}>
            {status ? (
                <View style={styles.selectedContainer}></View>
            ) : null}
        </TouchableOpacity>
    )
}

export default React.memo(CheckBox)