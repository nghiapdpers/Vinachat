import {StyleSheet} from 'react-native';
import {SCREEN} from '../../global';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },

  image: {
    width: SCREEN.width,
    height: (SCREEN.width / 3) * 4,
    alignSelf: 'center',
  },

  closeText: {
    color: mainTheme.white,
    alignSelf: 'center',
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
  },

  closeView: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#ffffff30',
    borderRadius: 8,
  },
});

export default styles;
