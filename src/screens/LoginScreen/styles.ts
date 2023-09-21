import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainTheme.background,
  },

  title: {
    fontSize: 60,
    fontFamily: 'lobster',
    color: 'black',
    alignSelf: 'center',
    marginTop: '25%',
  },

  inputView: {
    alignSelf: 'center',
    width: '85%',
    gap: 10,
    marginTop: '6%',
  },

  forgetPassButton: {
    alignSelf: 'flex-end',
  },

  signInView: {
    flexDirection: 'row',
    gap: 10,
    marginTop: '8%',
    justifyContent: 'space-between',
  },

  signInButton: {
    borderRadius: 180,
    width: '80%',
  },

  fingerprintImage: {
    width: 50,
    height: 50,
  },

  registerText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: mainTheme.text,
  },

  registerView: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    marginTop: '20%',
  },

  logoText: {
    fontSize: 40,
    fontFamily: 'lobster',
    color: mainTheme.logo,
    alignSelf: 'center',
    marginTop: '20%',
  },
});

export default styles;
