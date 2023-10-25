import {memo, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import images, {screen} from '../../assets/images';
import {openCamera, openPicker} from 'react-native-image-crop-picker';

type Props = {
  imageSource: string;
  visible: boolean;
  onOutsidePress?: () => void;
  onUpdatePress?: (image: string) => void;
};

function UpdateAvatarPicker({
  imageSource,
  visible,
  onOutsidePress,
  onUpdatePress,
}: Props) {
  const [image, setImage] = useState<string>(imageSource);

  // event handle: chose image
  const handleChoseImage = async () => {
    try {
      const image = await openPicker({
        mediaType: 'photo',
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.5,
      });

      if (image.path) {
        setImage(image.path);
      }
    } catch (error) {
      console.log('::::UPDATE AVATAR / HANDLE CHOOSE IMAGE ERROR::::\n', error);
    }
  };

  // event handle: take picture
  const handleTakePicture = async () => {
    try {
      const picture = await openCamera({
        mediaType: 'photo',
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.5,
      });

      if (picture.path) {
        setImage(picture.path);
      }
    } catch (error) {
      console.log('::::UPDATE AVATAR / HANDLE TAKE PICTURE ERROR::::\n', error);
    }
  };

  // event handle:

  return (
    visible && (
      <View style={styles.container}>
        <Pressable style={styles.outside} onPress={onOutsidePress} />
        <View style={styles.view}>
          <View>
            <Image
              source={image ? {uri: image} : screen.profile.usermale}
              style={styles.imageAvatar}
            />
            <TouchableOpacity
              style={styles.updateView}
              onPress={() => (onUpdatePress ? onUpdatePress(image) : null)}>
              <Text style={styles.updateText}>Cập nhật</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.rowItem} onPress={handleChoseImage}>
            <Image
              source={images.component.more_message_opt.image}
              style={styles.imageIcon}
            />
            <Text style={styles.rowText}>Chọn hình ảnh từ thư viện</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowItem} onPress={handleTakePicture}>
            <Image
              source={images.component.more_message_opt.photo}
              style={[styles.imageIcon, {width: 55, height: 55}]}
            />
            <Text style={styles.rowText}>Chụp ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

export default memo(UpdateAvatarPicker);
