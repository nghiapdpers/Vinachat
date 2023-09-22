import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = ({
  title,
  style,
  onPress,
  disable
}: {
  title: string;
  style: any;
  onPress: any;
  disable: boolean
}) => {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
