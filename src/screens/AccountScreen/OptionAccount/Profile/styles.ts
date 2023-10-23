import {StyleSheet, Dimensions} from 'react-native';
import mainTheme from '../../../../assets/colors';
const {height: HeightScreen, width: WidthScreen} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainTheme.background,
    alignItems: 'center',
  },
  header: {
    width: WidthScreen,
    height: HeightScreen * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagemore: {
    width: 30,
    height: 30,
  },
  potisionMore: {
    position: 'absolute',
    right: 25,
  },
  body: {
    flex: 1,
    width: WidthScreen,
  },
  headerprofile: {
    width: WidthScreen,
    height: HeightScreen * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyprofile: {
    width: WidthScreen,
    height: HeightScreen * 0.6,
    alignItems: 'center',
  },
  borderheaderprofile: {
    width: '95%',
    height: '80%',
    backgroundColor: mainTheme.white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  flexboxheader: {
    flex: 5,
    alignItems: 'center',
  },
  flexboxinfo: {
    flex: 5,
  },
  boderavatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: mainTheme.background,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
  },
  converAvatar: {
    width: '90%',
    height: '90%',
    borderRadius: 500,
  },
  flexboxInfoHeader: {
    flex: 1,
    alignItems: 'center',
  },
  FlexStatusInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontSize: 22,
  },
  statusborder: {
    width: '80%',
    height: '80%',
    backgroundColor: mainTheme.lowerFillLogo,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imagechat: {
    width: 40,
    height: 40,
  },
  borderSendMessage: {
    width: 60,
    height: '80%',
    backgroundColor: mainTheme.lowerFillLogo,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewbtnstatus1: {
    flex: 3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewbtnstatus2: {
    flex: 7,
    height: '100%',
    justifyContent: 'center',
  },
  imagestatus: {
    width: 30,
    height: 30,
    zIndex: 999,
  },
  ViewStatus: {
    flex: 7,
    height: '100%',
    alignItems: 'center',
  },
  ViewOption: {
    flex: 3,
    height: '100%',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: 16,
    left: 10,
  },
  allfriend: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
  },
  textallfriend: {
    fontSize: 16,
  },
  viewInfo: {
    width: WidthScreen * 0.95,
    height: 90,
    alignItems: 'center',
  },
  viewtitle: {
    width: WidthScreen * 0.95,
  },
  texttitle: {
    fontSize: 18,
  },
  viewdetail: {
    width: '100%',
    marginTop: 5,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'row',
  },
  textdetail: {
    fontSize: 16,
  },
  icondetail: {
    width: 30,
    height: 30,
  },
  iconflexborderdetail: {
    flex: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoflexborderdetail: {
    flex: 8,
    height: '100%',
    justifyContent: 'center',
  },
  changeAvatarBorder: {
    position: 'absolute',
    right: 10,
    bottom: -10,
  },
  changeAvatar: {
    width: 30,
    height: 30,
  },
});

export default styles;
