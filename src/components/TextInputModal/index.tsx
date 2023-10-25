import {memo, useState} from 'react';
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';

type Props = {
  onOutsidePress: () => void;
  onConfirmPress: (value: string) => void;
  title: string;
};

function TextInputModal({title, onOutsidePress, onConfirmPress}: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (value.length < 6) {
      setError('Tên nhóm phải từ 6 ký tự trở lên');
    } else {
      onConfirmPress(value);
    }
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onOutsidePress}>
      <Pressable style={styles.container} onPress={onOutsidePress}>
        <View style={styles.view}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            maxLength={50}
            onChangeText={setValue}
            onSubmitEditing={handleConfirm}
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

export default memo(TextInputModal);
