import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';
import {SCREEN} from '../../global';

const styles = StyleSheet.create({
  safeView: {
    position: 'absolute',
    backgroundColor: mainTheme.background,
    width: SCREEN.width,
    height: SCREEN.height,
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
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    width: SCREEN.width,
    alignSelf: 'center',
    columnGap: 100,
  },

  actionButton: {
    width: 60,
    height: 60,
  },

  featureView: {
    position: 'absolute',
    bottom: 180,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;
