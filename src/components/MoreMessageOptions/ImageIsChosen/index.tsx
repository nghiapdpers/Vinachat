import {
  Image,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {memo} from 'react';
import styles from './styles';

type Props = {
  uri: string;
  more: number;
  onPress: (e: GestureResponderEvent) => void;
};

function ImageIsChosen({uri, more, onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      {more > 0 && (
        <View style={styles.filter}>
          <Text style={styles.text}>+{more}</Text>
        </View>
      )}
      <Image
        source={{
          uri: uri,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

export default memo(
  ImageIsChosen,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);
