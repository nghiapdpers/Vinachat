import {StyleSheet} from 'react-native';
import {SCREEN} from '../../global';

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width,
  },

  modal: {
    maxHeight: 320,
  },

  background: {
    backgroundColor: 'white',
    maxHeight: 0,
  },

  emoji: {
    color: '#fff',
  },

  outside: {
    flex: 1,
  },
});

export default styles;
