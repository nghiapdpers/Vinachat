import React from 'react';
import styles from './styles';
import { Image, View, Text } from 'react-native';
import mainTheme from '../../assets/colors';
import Button from '../Button';

const CardRequest = ({ image, name }: { name: string, image: string }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={{ uri: image }} />
            <View style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 20, color: mainTheme.text }}>{name}</Text>
                <Text style={{ fontSize: 16, color: mainTheme.text }}>Had sent you a request</Text>

                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <Button
                        title='Deny'
                        styleText={{ color: mainTheme.white }}
                        style={{ backgroundColor: mainTheme.logo, width: '45%' }} />
                    <Button
                        title='Accept'
                        styleText={{ color: mainTheme.white }}
                        style={{ backgroundColor: mainTheme.logo, width: '45%', marginLeft: 4 }} />
                </View>
            </View>
        </View >
    )
}

export default React.memo(CardRequest)