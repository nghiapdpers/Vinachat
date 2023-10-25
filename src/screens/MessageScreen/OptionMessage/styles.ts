import {StyleSheet, Dimensions} from 'react-native';
import mainTheme from '../../../assets/colors';
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
  body: {
    flex: 1,
    width: WidthScreen,
    alignItems: 'center',
  },
  viewaddmember: {
    width: WidthScreen,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainTheme.white,
    flexDirection: 'row',
  },
  viewItem: {
    flex: 1,
  },
  viewtitle: {
    width: WidthScreen,
    height: 40,
    marginTop: 5,
    justifyContent: 'center',
  },
  texttitle: {
    fontSize: 14,
    color: mainTheme.logo,
    marginLeft: 10,
    fontWeight: '700',
  },
  borderItem: {
    width: '90%',
    backgroundColor: 'red',
  },
  viewborder: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: mainTheme.white,
    borderBottomWidth: 0.5,
    borderColor: '#e3e3e3',
    alignItems: 'center',
  },
  textoption: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  StylesAlert: {
    bottom: 10,
    position: 'absolute',
    backgroundColor: '#333333',
  },
  textAlert: {
    fontSize: 15,
    color: 'white',
    padding: 5,
  },

  groupName: {
    fontSize: 22,
    fontWeight: '500',
    color: mainTheme.green,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default styles;
