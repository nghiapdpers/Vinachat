import {Platform, StyleSheet} from 'react-native';
import {SCREEN} from '../../global';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
  },

  view: {
    backgroundColor: mainTheme.logo,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    rowGap: 20,
    paddingVertical: 20,
  },

  input: {
    backgroundColor: mainTheme.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 10,
    color: mainTheme.text,
    paddingVertical: 10,
  },

  title: {
    fontSize: 18,
    color: mainTheme.white,
    paddingHorizontal: '5%',
  },

  button: {
    backgroundColor: mainTheme.background,
    width: 150,
    borderRadius: 50,
    alignSelf: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: mainTheme.text,
    padding: 10,
    textAlign: 'center',
  },

  error: {
    fontSize: 14,
    color: 'yellow',
    paddingHorizontal: '5%',
    fontStyle: 'italic',
    fontWeight: '400',
  },
});

export default styles;
