import React from "react"
import { View, Text, TextInput } from "react-native"
import styles from "./styles"

const Input = ({ title, value, onChange, style, keyboardType, typePassword }: { title: string, value: any, onChange: any, style: any, keyboardType: any, typePassword: boolean }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={{ fontSize: 16 }}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                secureTextEntry={typePassword}
            />
        </View>
    )
}

export default React.memo(Input)