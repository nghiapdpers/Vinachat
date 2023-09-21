import React from 'react';
import styles from './styles';
import { Image, View, Text } from 'react-native';
import mainTheme from '../../assets/colors';


const CardFriends = ({ image, name, status }: { name: string, image: string, status: boolean }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={{ uri: image }} />
            <View style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 20, color: mainTheme.text }}>{name}</Text>
                {status ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ backgroundColor: mainTheme.green, width: 10, height: 10, borderRadius: 5 }} />
                        <Text style={{ color: mainTheme.green, marginLeft: 4 }}>Đang hoạt động</Text>
                    </View>
                ) : (
                    <Text style={{ color: '#C2C2C2', marginLeft: 4 }}>Không hoạt động</Text>
                )
                }
            </View>
        </View >
    )
}

export default React.memo(CardFriends)