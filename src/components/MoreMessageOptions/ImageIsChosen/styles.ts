import {StyleSheet} from 'react-native';
import mainTheme from '../../../assets/colors';

const styles = StyleSheet.create({
  filter: {
    backgroundColor: '#00000060',
    width: 120,
    height: 160,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 5,
    justifyContent: 'center',
  },

  image: {width: 120, height: 160, borderRadius: 10},

  text: {
    color: mainTheme.white,
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: '500',
  },
});

export default styles;
