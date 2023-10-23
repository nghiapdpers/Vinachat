export const component = {
  input: {
    show: require('./Components/Input/show.png'),
    hidden: require('./Components/Input/hidden.png'),
  },
  header: {
    back: require('./Components/Header/back.png'),
  },
  more_message_opt: {
    image: require('./Components/MoreMessageOptions/image.png'),
    photo: require('./Components/MoreMessageOptions/photo.png'),
  },
  list_image: {
    close: require('./Components/ListImage/close.png'),
  },
  modal : {
    warning : require('./Components/Modal/warning.png')
  },
  bottomsheet : {
    block : require('./Components/BottomSheet/blockUser.png')
  }
};

export const screen = {
  login: {
    fingerprint: require('./Screen/LoginScreen/fingerprint.png'),
    faceid: require('./Screen/LoginScreen/face-id.png'),
  },
  home: {
    search: require('./Screen/HomeScreen/search.png'),
    qrcode: require('./Screen/HomeScreen/qrcode.png'),
    creategroup: require('./Screen/HomeScreen/creategroup.png'),
  },
  bottomtab: {
    home: require('./BottomTab/home.png'),
    friend: require('./BottomTab/friend.png'),
    settings: require('./BottomTab/settings.png'),
    user: require('./BottomTab/user.png'),
    active_friend: require('./BottomTab/active-friend.png'),
    unactive_friend: require('./BottomTab/unactive-friend.png'),
    active_home: require('./BottomTab/active-home.png'),
    unactive_home: require('./BottomTab/unactive-home.png'),
    active_user: require('./BottomTab/active-user.png'),
    unactive_user: require('./BottomTab/unactive-user.png'),
  },
  account: {
    profile: require('./Screen/AccountScreen/profileuser.png'),
    padlock: require('./Screen/AccountScreen/padlock.png'),
    encrypted: require('./Screen/AccountScreen/encrypted.png'),
    optionalAccount: {
      changeAvatar: require('./Screen/AccountScreen/OptionalAccount/Profile/avatar-change.png'),
    },
  },
  message: {
    phonecall: require('./Screen/MessageScreen/phone-call.png'),
    videocall: require('./Screen/MessageScreen/video-camera.png'),
    list: require('./Screen/MessageScreen/list.png'),
    sendmessage: require('./Screen/MessageScreen/send-message.png'),
    more: require('./Screen/MessageScreen/more.png'),
    voicechat: require('./Screen/MessageScreen/microphone.png'),
    picture: require('./Screen/MessageScreen/picture.png'),
    emoji: require('./Screen/MessageScreen/emoji.png'),
    loading: require('./Screen/MessageScreen/loading.png'),
  },
  qrcode: {
    download: require('./Screen/QRCode/download.png'),
    share: require('./Screen/QRCode/share.png'),
    changeQR: require('./Screen/QRCode/refresh.png'),
  },
  creategroupchat: {
    camera: require('./Screen/CreateGroupChat/camera.png'),
    remove: require('./Screen/CreateGroupChat/remove.png'),
  },
  profile: {
    more: require('./Screen/ProfileScreen/more.png'),
    usermale: require('./Screen/ProfileScreen/UserMale.png'),
    userfemale: require('./Screen/ProfileScreen/UserFemale.png'),
    chat: require('./Screen/ProfileScreen/chat.png'),
    friend: require('./Screen/ProfileScreen/friend.png'),
    addfriend: require('./Screen/ProfileScreen/addfriend.png'),
    friendrequested: require('./Screen/ProfileScreen/friendrequested.png'),
    edituser: require('./Screen/ProfileScreen/edituser.png'),
    signature: require('./Screen/ProfileScreen/signature.png'),
    phone: require('./Screen/ProfileScreen/phone.png'),
    email: require('./Screen/ProfileScreen/email.png'),
    sex: require('./Screen/ProfileScreen/sex.png'),
    birthday: require('./Screen/ProfileScreen/birthday.png'),
    fullname: require('./Screen/ProfileScreen/fullname.png'),
  },
};

const images = {
  component,
  screen,
};

export default images;
