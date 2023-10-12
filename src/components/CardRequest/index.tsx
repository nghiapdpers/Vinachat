import React from 'react';
import styles from './styles';
import {Image, View, Text} from 'react-native';
import mainTheme from '../../assets/colors';
import Button from '../Button';

const CardRequest = ({
  image,
  name,
  onAccept,
  onDeny,
}: {
  name: string;
  image: string;
  onAccept: () => void;
  onDeny: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={{uri: image}} />
      <View style={{marginLeft: 8}}>
        <Text style={{fontSize: 20, color: mainTheme.text}}>{name}</Text>
        <Text style={{fontSize: 16, color: mainTheme.text}}>
          Had sent you a request
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 8,
            justifyContent: 'space-around',
          }}>
          <Button
            title="Deny"
            styleText={{
              color: mainTheme.white,
              fontSize: 16,
              fontWeight: '500',
              paddingVertical: -10,
            }}
            style={{backgroundColor: mainTheme.logo, width: '40%', height: 32}}
            onPress={onDeny}
          />
          <Button
            title="Accept"
            styleText={{
              color: mainTheme.white,
              fontSize: 16,
              fontWeight: '500',
              paddingVertical: -10,
            }}
            style={{
              backgroundColor: mainTheme.logo,
              width: '40%',
              marginLeft: 4,
              height: 32,
            }}
            onPress={onAccept}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(CardRequest);
