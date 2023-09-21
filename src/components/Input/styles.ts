import { StyleSheet } from 'react-native';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    backgroundColor: mainTheme.white,
    borderRadius: 10,
    padding: 4,
  },

  title: {
    fontSize: 16,
    color: mainTheme.text,
    fontWeight: '500',
    fontStyle: 'italic',
  },

  hiddenButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
    right: 10,
    opacity: 0.6,
  },

  hiddenImage: {
    width: 24,
    height: 24,
  },
});

export default styles;
