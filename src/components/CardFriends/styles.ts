import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: mainTheme.white,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  borderImage : {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor :mainTheme.logo
  }
});

export default styles;
