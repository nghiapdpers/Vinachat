import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '50%',
    backgroundColor: mainTheme.white,
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 20,
    paddingVertical: 8,
    color: mainTheme.text,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

export default styles;
