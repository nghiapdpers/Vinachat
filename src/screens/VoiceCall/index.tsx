import {SafeAreaView, Text, Image, View, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  permissions,
} from 'react-native-webrtc';

import styles from './styles';
import images from '../../assets/images';
import {useEffect, useState} from 'react';

const contraints = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

const rtdb = database();

const fsdb = firestore();

export default function VoiceCallScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const {to, type}: any = route?.params;

  // side effect:
  useEffect(() => {
    const pc = new RTCPeerConnection(contraints);
    let localStream: MediaStream;
    let remoteStream = new MediaStream();

    const prepareDevice = async () => {
      localStream = await mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });

      // pc.addEventListener('track', event => {
      //   event.streams[0].getTracks().forEach(track => {
      //     remoteStream.addTrack(track);
      //   });
      // });
    };

    const createOffer = async () => {
      const messageId = fsdb
        .collection('groups')
        .doc('1234')
        .collection('messages')
        .doc();
    };

    prepareDevice();

    return () => {
      pc.close();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      <Text style={styles.callingText}>
        {type == 'receive' ? 'Receive a call from...' : 'Calling...'}
      </Text>
      <Text style={styles.callTo}>{to}</Text>

      <View style={styles.actionsView}>
        {type == 'receive' && (
          <TouchableOpacity hitSlop={30}>
            <Image source={images.screen.voicecall.answer} />
          </TouchableOpacity>
        )}

        <TouchableOpacity hitSlop={30}>
          <Image source={images.screen.voicecall.decline} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
