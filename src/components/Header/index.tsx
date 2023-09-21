import React from "react"
import { View, Text, Image } from 'react-native'
import styles from "./styles"

const Header = ({ textLeft, textCenter, iconRight, style }: { textLeft: string, textCenter: string, iconRight: any, style: any }) => {
    return (
        <View style={[styles.container, style]}>
            {textLeft ? (
                <Text style={styles.text}>{textLeft}</Text>
            ) : null}
            {textCenter ? (
                <Text style={styles.text}>{textCenter}</Text>
            ) : null}
            {iconRight ? (
                <Image style={{ width: 25, height: 25 }} source={iconRight} />
            ) : null}
        </View>
    )
}

export default React.memo(Header)
