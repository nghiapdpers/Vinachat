import {
  MediaStream,
  RTCPeerConnection,
  mediaDevices,
} from 'react-native-webrtc';

// peer connection contraints
const contraints = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
    {
      urls: 'turn:relay1.expressturn.com:3478',
      username: 'ef69U0HHMR6GCNIEN0',
      credential: 'qdEAbwauz5NPLPNO',
    },
  ],
};

export default class PeerConnection4Call {
  private _peerConnection: RTCPeerConnection;
  private _localStream: MediaStream;
  private _remoteStream: MediaStream;
  private _cameraCount: number;

  constructor() {
    this._peerConnection = new RTCPeerConnection(contraints);
    this._localStream = new MediaStream();
    this._remoteStream = new MediaStream();
    this._cameraCount = 0;
  }

  /**
   * Get Current PeerConnection
   */
  public get peerConnection() {
    return this._peerConnection;
  }

  /**
   * Get Current Local stream
   */
  public get localStream() {
    return this._localStream;
  }

  /**
   * Get Current Remote stream
   */
  public get remoteStream() {
    return this._remoteStream;
  }

  /**
   * Return Boolean which is determine this device can switch camera or not
   */
  public get canSwitchCamera() {
    return this._cameraCount >= 2;
  }

  /**
   * This method must be called before start outgoing call or before accept incoming call.
   * @param callType type of incoming/outgoing calling
   */
  public async prepareDevices(callType: 'videocall' | 'voicecall') {
    // get local media device stream
    this._localStream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (callType == 'voicecall') {
      const localVideo = this._localStream.getVideoTracks()[0];
      localVideo.enabled = false;
    }

    // check total camera avaiable
    const devices: any = await mediaDevices.enumerateDevices();
    devices.map((device: any) => {
      if (device.kind != 'videoinput') {
        return;
      }

      this._cameraCount++;
    });

    // put my media track to peer connnection instance
    this._localStream.getTracks().forEach(track => {
      this._peerConnection.addTrack(track, this._localStream);
    });

    // put my media track into remoteStream (in case video call)
    this._peerConnection.addEventListener(
      'track',
      event => {
        event.streams[0].getTracks().forEach(track => {
          this._remoteStream.addTrack(track);
        });
      },
      {
        capture: false,
      },
    );
  }

  /**
   * This method will close the current peerconnection
   */
  public closePeerConnection() {
    this._peerConnection.close();
    this._localStream.getTracks().forEach(track => track.stop());
    this._remoteStream.getTracks().forEach(track => track.stop());
    this._cameraCount = 0;
  }

  /**
   * This method handle the remote audio volume.
   * @param volume the value of volume you want set. Value of this is from 0 to 10.
   */
  public handleRemoteAudioVolume(
    volume: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
  ) {
    this._remoteStream.getAudioTracks()[0]._setVolume(volume);
  }

  /**
   * This method handle speaker mode, on or off
   * @param enable The boolean value which you want turn on/off the speaker.
   */
  public handleSpeakerAudio(enable: boolean) {
    this._remoteStream.getAudioTracks()[0].enabled = enable;
  }

  /**
   * This method handle your microphone, on or off
   * @param enable The boolean value which you want turn on/off your mic.
   */
  public handleLocalMicro(enable: boolean) {
    this._localStream.getAudioTracks()[0].enabled = enable;
  }

  /**
   * This method handle your camera state, on or off
   * @param enbale The boolean value which you want turn on/off the camera.
   */
  public handleLocalCamera(enable: boolean) {
    this._localStream.getVideoTracks()[0].enabled = enable;
  }

  /**
   * This method switch your camera (if your device had more 2 camera - front and back)
   */
  public handleSwithCamera() {
    if (this._cameraCount >= 2) {
      this._localStream.getVideoTracks()[0]._switchCamera();
    }
  }
}
