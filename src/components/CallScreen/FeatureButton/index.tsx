import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import {memo} from 'react';

type Props = {
  active: boolean;
  imageSource: ImageSourcePropType;
  text: string;
  onPress: () => void;
};

function FeatureButton({active, imageSource, text, onPress}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.buttonView,
          active ? styles.activeContainer : styles.inactiveContainer,
        ]}
        hitSlop={10}>
        <Image source={imageSource} style={styles.image} />
      </TouchableOpacity>
      <Text
        style={[styles.text, !active ? styles.activeText : null]}
        numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

export default memo(FeatureButton);
