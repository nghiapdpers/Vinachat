import {StyleSheet, Dimensions} from 'react-native';
import mainTheme from '../../assets/colors';
const {height: HeightScreen, width: WidthScreen} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  flexboxBackText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
  },
  flexboxTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexboxOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  iconHeader: {
    width: 25,
    height: 25,
    margin: 5,
  },
  TitleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 24,
  },
  Username: {
    fontSize: 18,
  },
  textActive: {
    color: 'black',
    opacity: 0.3,
  },
});

export default styles;
