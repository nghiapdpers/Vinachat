import {SafeAreaView, Text, Image, View, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  mediaDevices,
} from 'react-native-webrtc';

import styles from './styles';
import images from '../../assets/images';
import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {CallActions, useCallDispatch} from './context';
import {WINDOW} from '../../global';
import mainTheme from '../../assets/colors';
import FeatureButton from '../../components/CallScreen/FeatureButton';
import apiUpdateLatestMessage from '../../apis/apiUpdateLatestMessage';

const contraints = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

const rtdb = database();

const fsdb = firestore();

type Props = {
  type: string;
  groupRef: string;
  name: string;
  status: string;
  callId: string;
};

export default function CallScreen({
  type,
  groupRef,
  name,
  status,
  callId,
}: Props) {
  // const call = useCall();
  const callDispatch = useCallDispatch();

  const myRef = useSelector((s: any) => s.user.data.ref);
  const myName = useSelector((s: any) => s.user.data.fullname);
  const answerListenRef = useRef<any>(null);
  const answerIceCandidatesRef = useRef<any>(null);
  const offerIceCandidatesRef = useRef<any>(null);

  // - peer connection instance a.k.a main core to handle webRTC
  const pc = useRef(new RTCPeerConnection(contraints)).current;
  // - local stream a.k.a my media stream
  const localStream = useRef<any | MediaStream>(null);
  const [localStreamUrl, setLocalStreamUrl] = useState('');
  // - remote stream a.k.a answer media stream (in case use video call)
  const remoteStream = useRef<MediaStream>(new MediaStream());
  const [remoteStreamUrl, setRemoteStreamUrl] = useState('');

  // calling is success state
  const [success, setSuccess] = useState(false);

  // feature state
  const [f_louded, setLouded] = useState(false);
  const [f_offSpeaker, setOffSpeaker] = useState(false);
  const [f_offMic, setOffMic] = useState(false);
  const [f_offCam, setOffCam] = useState(false);

  // check camera avaiable on device
  const cameraCount = useRef(0);

  // create message ref a.k.a call ref
  const callMessage = useRef(
    status == 'calling'
      ? fsdb.collection('groups').doc(groupRef).collection('messages').doc()
      : fsdb
          .collection('groups')
          .doc(groupRef)
          .collection('messages')
          .doc(callId),
  ).current;

  // make ref to save ICE candidates to realtime database
  const callRef = rtdb.ref('/calls').child(callMessage.id);
  const offerCandidates = callRef.child('offerCandidates');
  const answerCandidates = callRef.child('answerCandidates');

  // side effect: create offer if type is 'calling'
  useEffect(() => {
    // timer wait for the answer
    let timer: string | number | NodeJS.Timeout | undefined;

    // function prepare device before connection
    const prepareDevice = async () => {
      // get my media device stream
      localStream.current = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (type == 'voiceall') {
        const localVideo = localStream.current.getVideoTracks()[0];
        localVideo.enabled = false;
      }

      // check total camera avaiable
      const devices: any = await mediaDevices.enumerateDevices();
      devices.map((device: any) => {
        if (device.kind != 'videoinput') {
          return;
        }

        cameraCount.current = cameraCount.current + 1;
      });

      // put my media track to peer connnection instance
      localStream.current.getTracks().forEach(track => {
        pc.addTrack(track, localStream.current);
      });

      // put my media track into remoteStream (in case video call)
      pc.addEventListener(
        'track',
        event => {
          event.streams[0].getTracks().forEach(track => {
            remoteStream.current.addTrack(track);
          });
          setRemoteStreamUrl(remoteStream.current.toURL());
        },
        {
          capture: false,
        },
      );

      setLocalStreamUrl(localStream.current.toURL());
    };

    // after prepare device, we create offer and listen answer.
    const createOffer = async () => {
      // first, save my ICE candidates to realtime database server
      pc.addEventListener('icecandidate', e => {
        if (e.candidate) {
          offerCandidates.push(e.candidate?.toJSON());
        }
      });

      // after that, create an offer to can peer-to-peer connection.
      const offerDescription = await pc.createOffer();
      // and set this to RTCPeerconnection
      await pc.setLocalDescription(offerDescription);

      // save offer decripstion to realtime database server
      await callRef.child('offer').set({
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      });

      // send a message to firestore
      await callMessage.set({
        from: myRef,
        message: type == 'voicecall' ? 'Cuộc gọi thoại' : 'Cuộc gọi video',
        sent_time: firestore.Timestamp.now(),
        type: type,
        from_name: myName,
        call_status: 'living',
      });

      // update latest message (for production)
      await apiUpdateLatestMessage({
        group_ref: groupRef,
        message_ref: callMessage.id,
      })
        .then(res => {
          // console.log('update latest message', res);
        })
        .catch(err => {
          console.log(':::: UPDATE-LATEST-MESSAGE ERROR :::: >>\n', err);
        });

      // listening answer
      answerListenRef.current = callRef.child('answer').on('value', async e => {
        const data = e.val();

        // if remoteDecription is not set and data has answer
        if (!pc.currentRemoteDescription && data) {
          const remoteDescription = new RTCSessionDescription(data);
          pc.setRemoteDescription(remoteDescription);
          await callRef.child('status').set('ok');
          setSuccess(true);
        }
      });

      // save answer ICE candidates to peer connection
      answerIceCandidatesRef.current = answerCandidates.on('child_added', e => {
        const candidate = new RTCIceCandidate(e.val());
        pc.addIceCandidate(candidate);
      });
    };

    // prepare device for the call
    prepareDevice().then(() => {
      if (status == 'calling') {
        // create offer
        createOffer();

        // wait for 30s, after that cancel the calling if not answer
        timer = setTimeout(() => {
          // get answer
          callRef
            .child('answer')
            .once('value')
            .then(e => {
              if (!e.exists()) {
                handleDisconnect('Người dùng không trả lời');
              }
            });

          // clear timeout
          clearTimeout(timer);
        }, 30000);
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // event handler: answer voice call offer
  const handleAnswer = async () => {
    // save my ICE candidates to realtime database server
    pc.addEventListener('icecandidate', e => {
      if (e.candidate) {
        answerCandidates.push(e.candidate?.toJSON());
      }
    });

    // get offer value
    const offer = (await callRef.child('offer').once('value')).val();

    // create remote description and set into peer connection
    const remoteDescription = new RTCSessionDescription(offer);
    await pc.setRemoteDescription(remoteDescription);

    // create answer
    const answerDescription = await pc.createAnswer();

    // save to realtime database
    await callRef.child('answer').set({
      sdp: answerDescription.sdp,
      type: answerDescription.type,
    });

    // then, set into peer connnection after the offer had setRemoteDescription.
    const statusListener = callRef
      .child('status')
      .on('value', async snapshot => {
        if (snapshot.val() == 'ok') {
          setSuccess(true);
          await pc.setLocalDescription(answerDescription);
          callRef.child('status').off('value', statusListener);
        }
      });

    // listening offer cancdidates and add to peer connection
    offerIceCandidatesRef.current = offerCandidates.on('child_added', e => {
      const candidate = new RTCIceCandidate(e.val());
      pc.addIceCandidate(candidate);
    });
  };

  // event handler: disconnect
  const handleDisconnect = async (reason: string) => {
    // after craete offer success
    if (answerIceCandidatesRef.current) {
      // close peer connection
      pc.close();

      // stop track from media
      localStream.current.getTracks().forEach(track => {
        track.stop();
      });
      remoteStream.current.getTracks().forEach(track => {
        track.stop();
      });

      // unlistening answer
      answerListenRef.current
        ? callRef.child('answer').off('value', answerListenRef.current)
        : null;

      // unlistening ice candidates change from realtime database
      answerIceCandidatesRef.current
        ? answerCandidates.off('child_added', answerIceCandidatesRef.current)
        : null;
      offerIceCandidatesRef.current
        ? offerCandidates.off('child_added', offerIceCandidatesRef.current)
        : null;

      // update message call status is 'dead'
      await callMessage.update({
        call_status: 'dead',
        end_call_reason: reason,
      });

      // dispatch action to end call
      callDispatch(CallActions.endCall());
    }
  };

  // side effect: listen change the calling status
  useEffect(() => {
    let callingSubcribe: () => void;

    if (status == 'receive') {
      // listen calling status
      callingSubcribe = callMessage.onSnapshot(
        snapshot => {
          if (snapshot.get('call_status') == 'dead') {
            handleDisconnect('Kết thúc');
          }
        },
        err => {
          console.log(
            ':::: CALL SCREEN / CALLING SUBCRIBE SIDE EFFECT ERROR ::::\n',
            err,
          );
        },
      );
    } else {
      callingSubcribe = callMessage.onSnapshot(
        snapshot => {
          if (snapshot.get('call_status') == 'dead') {
            handleDisconnect(snapshot.get('end_call_reason'));
          }
        },
        err => {
          console.log(
            ':::: CALL SCREEN / CALLING SUBCRIBE SIDE EFFECT ERROR ::::\n',
            err,
          );
        },
      );
    }

    return () => {
      // destroy listener
      callingSubcribe();
    };
  }, []);

  // event handler: turn on/off louded mode
  const handleLoudedMode = () => {
    if (f_louded) {
      const remoteAudio = remoteStream.current.getAudioTracks()[0];
      remoteAudio._setVolume(1);
      setLouded(false);
    } else {
      const remoteAudio = remoteStream.current.getAudioTracks()[0];
      remoteAudio._setVolume(5);
      setLouded(true);
    }
  };

  // event handler: turn on/off off-speaker mode
  const handleOffSpeakerMode = () => {
    const remoteAudio = remoteStream.current.getAudioTracks()[0];
    remoteAudio.enabled = !remoteAudio.enabled;
    setOffSpeaker(!f_offSpeaker);
  };

  // event handler: turn on/off off-mic mode
  const handleOffMicMode = () => {
    const localAudio = localStream.current.getAudioTracks()[0];
    localAudio.enabled = !localAudio.enabled;
    setOffMic(!f_offMic);
  };

  // event handler: turn on/off off-camera mode
  const handleOffCameraMode = () => {
    const localVideo = localStream.current.getVideoTracks()[0];
    localVideo.enabled = !localVideo.enabled;
    setOffCam(!f_offCam);
  };

  // event handler: turn on/off off-speaker mode
  const handleSwitchCamera = () => {
    if (cameraCount.current > 1) {
      const localVideo = localStream.current.getVideoTracks()[0];
      localVideo._switchCamera();
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {type == 'voicecall' ? (
        <>
          {!success ? (
            <Text style={styles.callingText}>
              {status == 'receive'
                ? 'Receive a voicecall from...'
                : 'Voice Calling...'}
            </Text>
          ) : (
            <Text style={[styles.callingText, {color: mainTheme.green}]}>
              Connected.
            </Text>
          )}
          <Text style={styles.callTo}>{name}</Text>
        </>
      ) : (
        <>
          {status == 'receive' && !success ? (
            <>
              <Text style={styles.callingText}>
                Receive a videocall from...
              </Text>
              <Text style={styles.callTo}>{name}</Text>
            </>
          ) : (
            <>
              <RTCView
                style={{
                  width: WINDOW.width,
                  height: WINDOW.height,
                  position: 'absolute',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }}
                streamURL={localStreamUrl}
              />

              <RTCView
                style={{
                  width: (WINDOW.width / 8) * 3,
                  height: (WINDOW.width / 8) * 4,
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(0,0,0,1)',
                }}
                streamURL={remoteStreamUrl}
              />
            </>
          )}
        </>
      )}

      {success && (
        <View style={styles.featureView}>
          <FeatureButton
            imageSource={images.screen.voicecall.louded}
            text={'Louded'}
            active={f_louded}
            onPress={handleLoudedMode}
          />
          <FeatureButton
            imageSource={images.screen.voicecall.no_speaker}
            text={'Off-Speaker'}
            active={f_offSpeaker}
            onPress={handleOffSpeakerMode}
          />
          <FeatureButton
            imageSource={images.screen.voicecall.mute}
            text={'Off-Mic'}
            active={f_offMic}
            onPress={handleOffMicMode}
          />
          {type == 'videocall' && (
            <>
              <FeatureButton
                imageSource={images.screen.voicecall.no_camera}
                text={'Off-Cam'}
                active={f_offCam}
                onPress={handleOffCameraMode}
              />
              <FeatureButton
                imageSource={images.screen.voicecall.switch_camera}
                text={'Switch'}
                active={true}
                onPress={handleSwitchCamera}
              />
            </>
          )}
        </View>
      )}

      <View style={styles.actionsView}>
        {status == 'receive' && !success && (
          <TouchableOpacity hitSlop={20} onPress={handleAnswer}>
            <Image
              source={images.screen.voicecall.answer}
              style={styles.actionButton}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          hitSlop={20}
          onPress={() => handleDisconnect('Kết thúc')}>
          <Image
            source={images.screen.voicecall.decline}
            style={styles.actionButton}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
