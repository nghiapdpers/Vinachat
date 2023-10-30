import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';
import {SCREEN} from '../../global';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: mainTheme.background,
  },

  callTo: {
    fontSize: 30,
    fontWeight: '500',
    color: mainTheme.text,
    textAlign: 'center',
    marginTop: 20,
  },

  callingText: {
    fontSize: 20,
    fontWeight: '400',
    color: mainTheme.text,
    textAlign: 'center',
    marginTop: 150,
  },

  actionsView: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    width: SCREEN.width,
    alignSelf: 'center',
    columnGap: 100,
  },
});

export default styles;
