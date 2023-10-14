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
  },
  borderMessage: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
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
});

export default styles;
