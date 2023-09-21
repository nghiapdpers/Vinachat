import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { component } from '../../assets/images';

const Input = ({
  title,
  value,
  onChange,
  style,
  keyboardType,
  secureText = false,
}: {
  title: string;
  value: any;
  onChange: any;
  style: any;
  keyboardType: any;
  secureText?: boolean;
}) => {
  const [isShown, setIsShown] = useState(false);

  // event handler: show/hide show password button press
  const onChangeSecureText = () => {
    setIsShown(!isShown);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={{ fontSize: 16, marginTop: -5 }}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        secureTextEntry={!isShown}
      />
      {secureText && (
        <TouchableOpacity
          style={styles.hiddenButton}
          onPress={onChangeSecureText}>
          <Image
            source={isShown ? component.input.hidden : component.input.show}
            style={styles.hiddenImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(Input);
