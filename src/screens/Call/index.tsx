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
import {WINDOW, parseMsToSeconds} from '../../global';
import mainTheme from '../../assets/colors';
import FeatureButton from '../../components/CallScreen/FeatureButton';
import InCallManager from 'react-native-incall-manager';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {CallActions} from '../../redux/actions/callActions';
import {callKeep} from '../../config/utils/CallKeep';
import PeerConnection4Call from '../../config/utils/PeerConnection4Call';
import TheCaller from '../../config/utils/TheCaller';

// const contraints = {
//   iceServers: [
//     {
//       urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
//     },
//     {
//       urls: 'turn:relay1.expressturn.com:3478',
//       username: 'ef69U0HHMR6GCNIEN0',
//       credential: 'qdEAbwauz5NPLPNO',
//     },
//   ],
// };

const rtdb = database();

const fsdb = firestore();

export default function CallScreen() {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const route = useRoute();

  const {type, groupRef, name, status, callId, reply}: any = route.params;

  const answerListenRef = useRef<any>(null);
  const answerIceCandidatesRef = useRef<any>(null);
  const offerIceCandidatesRef = useRef<any>(null);

  // create peer connection for call instance
  const pc4call = useRef(TheCaller.instance.current).current;
  // - peer connection instance a.k.a main core to handle webRTC
  const pc = useRef(pc4call.peerConnection).current;
  // - local stream a.k.a my media stream
  // const localStream = useRef<any | MediaStream>(null);
  const [localStreamUrl, setLocalStreamUrl] = useState('');
  // - remote stream a.k.a answer media stream (in case use video call)
  // const remoteStream = useRef<MediaStream>(new MediaStream());
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

  // start & end call Time (ms - milliseconds)
  const startTime = useRef(0);
  const endTime = useRef(0);

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
    // const prepareDevice = async () => {
    //   // get my media device stream
    //   localStream.current = await mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true,
    //   });

    //   if (type == 'voicecall') {
    //     const localVideo = localStream.current.getVideoTracks()[0];
    //     localVideo.enabled = false;
    //   }

    //   // check total camera avaiable
    //   const devices: any = await mediaDevices.enumerateDevices();
    //   devices.map((device: any) => {
    //     if (device.kind != 'videoinput') {
    //       return;
    //     }

    //     cameraCount.current = cameraCount.current + 1;
    //   });

    //   // put my media track to peer connnection instance
    //   localStream.current.getTracks().forEach(track => {
    //     pc.addTrack(track, localStream.current);
    //   });

    //   // put my media track into remoteStream (in case video call)
    //   pc.addEventListener(
    //     'track',
    //     event => {
    //       event.streams[0].getTracks().forEach(track => {
    //         remoteStream.current.addTrack(track);
    //       });
    //       setRemoteStreamUrl(remoteStream.current.toURL());
    //     },
    //     {
    //       capture: false,
    //     },
    //   );

    //   setLocalStreamUrl(localStream.current.toURL());
    // };

    // after prepare device, we create offer and listen answer.
    const createOffer = async () => {
      // manager calling, ringback
      InCallManager.start({
        media: type == 'voicecall' ? 'audio' : 'video',
        ringback: '_DTMF_',
      });

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

      // call api videocall or voiceccall
      dispatch(
        CallActions.call.start({
          group_ref: groupRef,
          callPath: callMessage.path,
          callType: type,
          callerOffer: JSON.stringify(offerDescription),
        }),
      );

      // start CallKeep
      // callm.startCall(callMessage.id, name, name);

      // listening answer
      answerListenRef.current = callRef.child('answer').on('value', async e => {
        const data = e.val();

        // if remoteDecription is not set and data has answer
        if (!pc.currentRemoteDescription && data) {
          const remoteDescription = new RTCSessionDescription(data);
          pc.setRemoteDescription(remoteDescription);
          await callRef.child('status').set('ok');

          startTime.current = new Date().getTime();
          setSuccess(true);

          // stop ringback
          InCallManager.stopRingback();
        }
      });

      // save answer ICE candidates to peer connection
      answerIceCandidatesRef.current = answerCandidates.on('child_added', e => {
        const candidate = new RTCIceCandidate(e.val());
        pc.addIceCandidate(candidate);
      });
    };

    // prepare device for the call
    pc4call.prepareDevices(type).then(() => {
      if (status == 'calling') {
        // create offer
        createOffer();

        setLocalStreamUrl(pc4call.localStream.toURL());
        setRemoteStreamUrl(pc4call.remoteStream.toURL());

        // wait for 30s, after that cancel the calling if not answer
        timer = setTimeout(() => {
          // get answer
          callRef
            .child('answer')
            .once('value')
            .then(e => {
              if (!e.exists()) {
                handleDisconnect('Người dùng không trả lời', true);
                // end call
                callKeep.endCall(callMessage.id);
                // busytone
                InCallManager.stop({busytone: '_DTMF_'});
              }
            });

          // clear timeout
          clearTimeout(timer);
        }, 30000);
      } else {
        // InCallManager.startRingtone('_DTMF_');
        if (reply == 'accept') {
          handleAnswer();
        } else if (reply == 'reject') {
          handleDisconnect('Từ chối cuộc gọi', true);
          callKeep.rejectCall(callMessage.id);
        }
      }
    });

    // listen change the calling status
    const callingSubcribe = callMessage.onSnapshot(
      snapshot => {
        if (
          snapshot.get('call_status')?.toString() == 'dead' &&
          snapshot.get('end_call_reason')?.toString()
        ) {
          handleDisconnect(snapshot.get('end_call_reason'), false);

          // stop call manager
          if (
            'Người dùng bận, Từ chối cuộc gọi'.includes(
              snapshot.get('end_call_reason')?.toString(),
            ) &&
            status == 'calling'
          ) {
            InCallManager.stop({busytone: '_DTMF_'});
          }

          if (
            'Người dùng bận, Từ chối cuộc gọi'.includes(
              snapshot.get('end_call_reason')?.toString(),
            ) &&
            status == 'receive'
          ) {
            InCallManager.stopRingtone();
            InCallManager.stop();
          }

          if (snapshot.get('end_call_reason')?.toString() == 'Kết thúc') {
            InCallManager.stop();
          }
        }
      },
      err => {
        console.log(
          ':::: CALL SCREEN / CALLING SUBCRIBE SIDE EFFECT ERROR ::::\n',
          err,
        );
      },
    );

    return () => {
      clearTimeout(timer);
      callingSubcribe();
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

    // answer imcoming call
    callKeep.answerCall(callMessage.id);

    // listening offer cancdidates and add to peer connection
    offerIceCandidatesRef.current = offerCandidates.on('child_added', e => {
      const candidate = new RTCIceCandidate(e.val());
      pc.addIceCandidate(candidate);
    });

    InCallManager.stopRingtone();
    InCallManager.start({media: type == 'voicecall' ? 'audio' : 'video'});
  };

  // event handler: disconnect
  const handleDisconnect = async (reason: string, isUpdated: boolean) => {
    if (status == 'calling' && startTime.current != 0) {
      endTime.current = new Date().getTime();
    }

    const callTimeMs = endTime.current - startTime.current;
    const callTimeSec = parseMsToSeconds(callTimeMs);

    // // close peer connection
    // pc.close();

    // // stop track from media
    // localStream.current.getTracks().forEach(track => {
    //   track.stop();
    // });
    // remoteStream.current.getTracks().forEach(track => {
    //   track.stop();
    // });

    pc4call.closePeerConnection();
    TheCaller.instance.delete();

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
    const updateMessageData = {
      call_status: 'dead',
      end_call_reason: reason,
      call_time: typeof callTimeSec == 'number' ? callTimeSec : undefined,
    };

    if (status == 'receive') {
      delete updateMessageData.call_time;
    }

    if (isUpdated) await callMessage.update(updateMessageData);

    // goback previous screen
    navigation.goBack();
  };

  // event handler: turn on/off louded mode
  const handleLoudedMode = () => {
    if (f_louded) {
      pc4call.handleRemoteAudioVolume(1);
      setLouded(false);
    } else {
      pc4call.handleRemoteAudioVolume(5);
      setLouded(true);
    }
  };

  // event handler: turn on/off off-speaker mode
  const handleOffSpeakerMode = () => {
    pc4call.handleSpeakerAudio(f_offSpeaker);
    setOffSpeaker(!f_offSpeaker);
  };

  // event handler: turn on/off off-mic mode
  const handleOffMicMode = () => {
    pc4call.handleLocalMicro(f_offMic);
    setOffMic(!f_offMic);
  };

  // event handler: turn on/off off-camera mode
  const handleOffCameraMode = () => {
    pc4call.handleLocalCamera(f_offCam);
    setOffCam(!f_offCam);
  };

  // event handler: turn on/off off-speaker mode
  const handleSwitchCamera = () => {
    pc4call.handleSwithCamera();
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
          onPress={() => {
            handleDisconnect('Kết thúc', true);
            callKeep.endCall(callMessage.id);
          }}>
          <Image
            source={images.screen.voicecall.decline}
            style={styles.actionButton}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
