import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = ({
  title,
  style,
  onPress,
  styleText,
}: {
  title: string;
  style: any;
  onPress: any;
  styleText: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.title, styleText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
