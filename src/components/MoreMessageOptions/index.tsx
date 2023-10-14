import {View, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  Asset,
} from 'react-native-image-picker';
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
  onImagesUpdate: (data: Asset[]) => void;
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
    const image = await launchImageLibrary({
      mediaType: 'mixed',
      presentationStyle: 'fullScreen',
      videoQuality: 'medium',
      quality: 0.5,
      selectionLimit: 0,
    });

    if (
      !image.errorCode &&
      !image.errorMessage &&
      !image.didCancel &&
      image.assets
    ) {
      const imageList = [...image.assets];

      if (action == 'add') imagesDispatch(chosenImageActions.add(imageList));
      else imagesDispatch(chosenImageActions.new(imageList));
    }
  };

  // event handler: take picture form camera
  const handleOnTakePicture = async (action: 'new' | 'add') => {
    const picture = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      cameraType: 'back',
      // saveToPhotos: true,
    });

    if (
      !picture.errorCode &&
      !picture.errorMessage &&
      !picture.didCancel &&
      picture.assets
    ) {
      const imageList = [...picture.assets];

      if (action == 'add') imagesDispatch(chosenImageActions.add(imageList));
      else imagesDispatch(chosenImageActions.new(imageList));
    }
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
                uri={imagesData[imagesData.length - 1].uri!}
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
