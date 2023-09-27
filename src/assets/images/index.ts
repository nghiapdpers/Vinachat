export const component = {
  input: {
    show: require('./Components/Input/show.png'),
    hidden: require('./Components/Input/hidden.png'),
  },
  header :{
    back : require('./Components/Header/back.png')
  }
};

export const screen = {
  login: {
    fingerprint: require('./Screen/LoginScreen/fingerprint.png'),
  },
  home : {
    search : require('./Screen/HomeScreen/search.png'),
    qrcode : require('./Screen/HomeScreen/qrcode.png'),
    creategroup : require('./Screen/HomeScreen/creategroup.png')
  },
  bottomtab : {
    home : require('./BottomTab/home.png'),
    friend : require('./BottomTab/friend.png'),
    settings : require('./BottomTab/settings.png'),
    user : require('./BottomTab/user.png')
  },
  account : {
    profile : require('./Screen/AccountScreen/profileuser.png'),
    padlock : require('./Screen/AccountScreen/padlock.png'),
    encrypted : require('./Screen/AccountScreen/encrypted.png')
  },
  message : {
    phonecall : require('./Screen/MessageScreen/phone-call.png'),
    videocall : require('./Screen/MessageScreen/video-camera.png'),
    list : require('./Screen/MessageScreen/list.png'),
    sendmessage : require('./Screen/MessageScreen/send-message.png'),
    more : require('./Screen/MessageScreen/more.png'),
    voicechat : require('./Screen/MessageScreen/microphone.png'),
    picture : require('./Screen/MessageScreen/picture.png'),
    emoji :require('./Screen/MessageScreen/emoji.png')
  },
  qrcode : {
    download : require('./Screen/QRCode/download.png'),
    share : require('./Screen/QRCode/share.png'),
    changeQR : require('./Screen/QRCode/refresh.png')
  }
};

const images = {
  component,
};

export default images;
