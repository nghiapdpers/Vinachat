import {memo} from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import styles from './styles';

export type TextButtonProps = {
  text: string;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

const TextButton = memo(function ({text, onPress, style}: TextButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
});

export default TextButton;
