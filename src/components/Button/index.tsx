import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';

const Button = ({
  title,
  style,
  onPress,
  disable,
  styleText,
  loading = false
}: {
  title: string;
  style?: any;
  onPress: any;
  disable?: boolean
  styleText?: any
  loading?: boolean
}) => {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.title, styleText]}>{title}</Text>
      {loading ? (
        <ActivityIndicator size='large' style={{ marginLeft: 8 }} />
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
