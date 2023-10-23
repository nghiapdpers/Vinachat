import {View, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import {
  openPicker,
  openCamera,
  Image as ImageAsset,
  clean,
} from 'react-native-image-crop-picker';
import {memo, useEffect, useState} from 'react';

import styles from './styles';
import images from '../../assets/images';
import ImageIsChosen from './ImageIsChosen';
import ImageList from './ImageList';
import {
  ChosenImageProvider,
  useChosenImageContext,
  useChosenImageDispatch,
  chosenImageActions,
} from './contex';

type Props = {
  visible: boolean;
  extraClearImages?: any;
  onImagesUpdate: (data: ImageAsset[]) => void;
};

const MoreMessageOptions = memo(function ({
  visible,
  extraClearImages,
  onImagesUpdate,
}: Props) {
  const imagesData = useChosenImageContext();
  const imagesDispatch = useChosenImageDispatch();
  const [imageListVisible, setImageListVisible] = useState(false);

  // event handler: choose image from library
  const handleOnPickImage = async (action: 'new' | 'add') => {
    try {
      const image = await openPicker({
        multiple: true,
        maxFiles: 10,
        minFiles: 0,
        mediaType: 'photo',
      });

      if (image.length > 0) {
        const imageList = [...image];

        if (action == 'add') imagesDispatch(chosenImageActions.add(imageList));
        else imagesDispatch(chosenImageActions.new(imageList));
      }
    } catch (error) {}
  };

  // event handler: take picture form camera
  const handleOnTakePicture = async (action: 'new' | 'add') => {
    try {
      const picture = await openCamera({
        mediaType: 'photo',
      });

      if (picture) {
        const imageList = [picture];

        if (action == 'add') imagesDispatch(chosenImageActions.add(imageList));
        else imagesDispatch(chosenImageActions.new(imageList));
      }
    } catch (error) {}
  };

  // side effect: whenever images data has change
  useEffect(() => {
    onImagesUpdate(imagesData);
    if (imagesData.length == 0) {
      setImageListVisible(false);
    }
  }, [imagesData]);

  // side effect: clear images data when extra change
  useEffect(() => {
    imagesDispatch(chosenImageActions.removeAll());
  }, [extraClearImages]);

  useEffect(() => {
    return () => {
      // clean temp file
      clean();
    };
  }, []);

  return (
    visible && (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {imagesData.length > 0 && (
            <ScrollView
              horizontal
              contentContainerStyle={styles.imagesView}
              showsHorizontalScrollIndicator={false}>
              <ImageIsChosen
                uri={imagesData[imagesData.length - 1].path}
                more={imagesData.length - 1}
                onPress={_ => {
                  setImageListVisible(true);
                }}
              />

              <TouchableOpacity
                style={styles.imagePress}
                onPress={() => handleOnPickImage('add')}>
                <Text style={styles.addMoreImage}>+ Chọn thêm ảnh</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.imagePress}
                onPress={() => handleOnTakePicture('add')}>
                <Text style={styles.addMoreImage}>+ Chụp thêm ảnh</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => handleOnPickImage('new')}>
            <Image
              source={images.component.more_message_opt.image}
              style={styles.imageIcon}
            />
            <Text style={styles.rowText}>Chọn hình ảnh từ thư viện</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => handleOnTakePicture('new')}>
            <Image
              source={images.component.more_message_opt.photo}
              style={[styles.imageIcon, {width: 55, height: 55}]}
            />
            <Text style={styles.rowText}>Chụp ảnh</Text>
          </TouchableOpacity>
          <ImageList
            visible={imageListVisible}
            onClose={() => setImageListVisible(false)}
          />
        </ScrollView>
      </View>
    )
  );
});

function MoreMessageOptionsWrapper({
  visible,
  onImagesUpdate,
  extraClearImages,
}: Props) {
  return (
    <ChosenImageProvider>
      <MoreMessageOptions
        visible={visible}
        onImagesUpdate={onImagesUpdate}
        extraClearImages={extraClearImages}
      />
    </ChosenImageProvider>
  );
}

export default memo(MoreMessageOptionsWrapper);
