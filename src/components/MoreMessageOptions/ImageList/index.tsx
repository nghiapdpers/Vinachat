import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { memo, useEffect, useState } from 'react';
import images from '../../../assets/images';
import {
  chosenImageActions,
  useChosenImageContext,
  useChosenImageDispatch,
} from '../contex';

type Props = {
  visible: boolean;
  onClose: () => void;
};

function ImageList({ visible, onClose }: Props) {
  const data = useChosenImageContext();
  const dispatch = useChosenImageDispatch();

  // event handle: delete image
  const handleDeleteImage = (index: number) => {
    dispatch(chosenImageActions.remove(index));
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <FlatList
        numColumns={3}
        data={data}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item.path }} style={styles.image} />
            <TouchableOpacity
              style={styles.closeView}
              onPress={() => handleDeleteImage(index)}>
              <Image
                source={images.component.list_image.close}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={
          <TouchableOpacity onPress={onClose} style={styles.header}>
            <Text style={styles.headerCloseText}>Đóng</Text>
          </TouchableOpacity>
        }
        stickyHeaderIndices={[0]}
      />
    </Modal>
  );
}

export default memo(
  ImageList,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);
