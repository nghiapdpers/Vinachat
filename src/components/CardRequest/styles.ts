import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: 'row',
    backgroundColor: mainTheme.white,
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 15,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default styles;
