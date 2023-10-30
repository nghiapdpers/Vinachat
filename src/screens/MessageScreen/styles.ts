import {StyleSheet, Dimensions} from 'react-native';
import mainTheme from '../../assets/colors';
import {SCREEN} from '../../global';
const {height: HeightScreen, width: WidthScreen} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainTheme.background,
  },
  header: {
    width: WidthScreen,
    height: HeightScreen * 0.05,
    justifyContent: 'center',
  },
  bodyMessage: {
    flex: 1,
    // backgroundColor: 'red'
  },
  MessageView: {
    flex: 9.5,
    backgroundColor: mainTheme.background,
  },
  MessageInput: {
    width: WidthScreen,
    height: 55,
    backgroundColor: mainTheme.background,
    flexDirection: 'row',
  },
  borderInput: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    backgroundColor: mainTheme.white,
    borderRadius: 40,
    justifyContent: 'center',
  },
  textinput: {
    width: '70%',
    height: '100%',
    left: 10,
  },
  iconemoji: {
    width: 30,
    height: 30,
  },
  iconmore: {
    width: 25,
    height: 25,
    left: 7,
  },
  emoji: {
    position: 'absolute',
    right: 50,
  },
  send: {
    position: 'absolute',
    right: 5,
  },
  moreInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderViewInput: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    flex: 1,
    width: WidthScreen,
  },
  borderMessageAndroid: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    // textAlign: 'center',
    maxWidth: '70%',
    fontSize: 14,
    color: 'black',
  },
  borderMessageIos: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    // textAlign: 'center',
    maxWidth: '70%',
  },
  messageStatus: {
    alignSelf: 'flex-end',
    marginRight: 5,
    color: 'grey',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: mainTheme.background,
  // },
  // header: {
  //   width: WidthScreen,
  //   height: HeightScreen * 0.05,
  //   justifyContent: 'center',
  // },
  // bodyMessage: {
  //   flex: 1,
  //   // backgroundColor: 'red'
  // },
  // MessageView: {
  //   flex: 9.5,
  //   backgroundColor: mainTheme.background,
  // },
  // MessageInput: {
  //   width: WidthScreen,
  //   height: 55,
  //   backgroundColor: mainTheme.background,
  //   flexDirection: 'row',
  // },
  // borderInput: {
  //   width: '95%',
  //   height: 50,
  //   borderWidth: 1,
  //   borderColor: '#BBBBBB',
  //   backgroundColor: mainTheme.white,
  //   borderRadius: 40,
  //   justifyContent: 'center',
  // },
  // textinput: {
  //   width: '85%',
  //   height: '100%',
  //   left: 10,
  // },
  // iconemoji: {
  //   width: 30,
  //   height: 30,
  // },
  // iconmore: {
  //   width: 25,
  //   height: 25,
  //   left: 7,
  // },
  // emoji: {
  //   position: 'absolute',
  //   right: 5,
  // },
  // moreInput: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // borderViewInput: {
  //   flex: 9,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // messageContainer: {
  //   flex: 1,
  // },
  // borderMessage: {
  //   margin: 10,
  //   padding: 10,
  //   borderRadius: 40,
  // },
  textMessage: {
    fontSize: 15,
    color: 'black',
  },
  imageMessage: {
    width: SCREEN.width * 0.6,
    height: SCREEN.width * 0.8,
    marginVertical: 5,
    justifyContent: 'center',
  },

  messageFromName: {
    fontWeight: '500',
    color: mainTheme.logo,
    marginLeft: 15,
    fontSize: 16,
  },

  loadmoreText: {
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: mainTheme.logo,
    textAlign: 'center',
    color: mainTheme.white,
  },
  containerCategoryEmoji: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 12,
    justifyContent: 'space-between',
    marginTop: 4,
  },
  categoryEmoji: {
    fontSize: 24,
    color: mainTheme.white,
  },
  selectedCategoryEmoji: {
    borderColor: mainTheme.logo,
    borderWidth: 2,
    marginTop: 2,
    borderRadius: 180,
  },

  callMessage: {
    padding: 8,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    width: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  callMessageIcon: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },

  callMessageTextView: {
    flex: 1,
  },

  callMessageTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: mainTheme.text,
  },

  callMessageReason: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
  },

  recallButton: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '50%',
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },

  recallText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: mainTheme.logo,
    paddingVertical: 5,
    textAlign: 'center',
  },
  containerNoMessage: {
    backgroundColor: mainTheme.white,
    borderRadius: 20,
    marginHorizontal: 16,
  },
  backgroundNoMessage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  avatarNoMessage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: mainTheme.lowerFillLogo,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
