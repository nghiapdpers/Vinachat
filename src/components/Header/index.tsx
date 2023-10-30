import {Image, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  Iconback,
  text,
  status,
  IconOption1,
  IconOption2,
  IconOption3,
  title,
  onPressIconOption3,
  onPressIconOption2,
  onPressIconOption1,
}: any) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexboxBackText}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.iconHeader} source={Iconback} />
        </TouchableOpacity>
        <View style={{marginLeft: 5, maxWidth: '80%'}}>
          <Text style={styles.Username} numberOfLines={1}>
            {text}
          </Text>
          {status && <Text style={styles.textActive}>{status}</Text>}
        </View>
      </View>

      {title && (
        <View style={styles.flexboxTitle}>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
      )}

      <View style={styles.flexboxOption}>
        {IconOption1 && (
          <TouchableOpacity onPress={onPressIconOption1}>
            <Image style={styles.iconHeader} source={IconOption1} />
          </TouchableOpacity>
        )}

        {IconOption2 && (
          <TouchableOpacity onPress={onPressIconOption2}>
            <Image style={styles.iconHeader} source={IconOption2} />
          </TouchableOpacity>
        )}

        {IconOption3 && (
          <TouchableOpacity onPress={onPressIconOption3}>
            <Image style={styles.iconHeader} source={IconOption3} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Header);
