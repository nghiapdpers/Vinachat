
import React from "react"
import { SafeAreaView, ActivityIndicator } from "react-native"
import styles from "./styles"

const Loading = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size='large' />
        </SafeAreaView>
    )
}

export default React.memo(Loading)