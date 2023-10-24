import React from 'react';
import styles from './styles';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import mainTheme from '../../assets/colors';

const CardFriends = ({
  image,
  name,
  status,
  onPress,
}: {
  name: string;
  image: string;
  status: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {image ? (
        <Image style={styles.icon} source={{uri: image}} />
      ) : (
        <View style={styles.borderImage}></View>
      )}
      <View style={{marginLeft: 8}}>
        <Text style={{fontSize: 20, color: mainTheme.text}}>{name}</Text>
        {status ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: mainTheme.green,
                width: 10,
                height: 10,
                borderRadius: 5,
              }}
            />
            <Text style={{color: mainTheme.green, marginLeft: 4}}>
              Đang hoạt động
            </Text>
          </View>
        ) : (
          <Text style={{color: '#C2C2C2', marginLeft: 4}}>Không hoạt động</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CardFriends);
