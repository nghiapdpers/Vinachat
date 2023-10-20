import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import styles from './styles';

export default function DetailImageScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const {imageSource}: any = route.params;

  const scaleValue = useSharedValue(1);

  const scaleGesture = Gesture.Pinch()
    .onUpdate(e => {
      console.log(e);
      scaleValue.value = e.scale;
    })
    .onFinalize(e => {
      if (e.scale < 1) {
        scaleValue.value = withTiming(1);
      }
    });

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={scaleGesture}>
        <Animated.Image
          style={[styles.image, {transform: [{scale: scaleValue}]}]}
          source={{uri: imageSource}}
          resizeMode="contain"
        />
      </GestureDetector>

      <TouchableOpacity
        style={styles.closeView}
        onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>Đóng</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
