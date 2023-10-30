import {StyleSheet} from 'react-native';
import mainTheme from '../../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  buttonView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    borderRadius: 40,
    justifyContent: 'center',
  },

  activeContainer: {
    backgroundColor: mainTheme.white,
  },

  inactiveContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    opacity: 0.3,
  },

  image: {
    width: 24,
    height: 24,
  },

  text: {
    fontSize: 12,
    color: mainTheme.logo,
    paddingVertical: 2,
  },

  activeText: {
    color: 'black',
    opacity: 0.6,
  },
});

export default styles;
