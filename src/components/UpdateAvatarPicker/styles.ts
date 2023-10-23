import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';
import {SCREEN} from '../../global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#00000030',
  },

  outside: {
    flex: 1,
  },

  view: {
    backgroundColor: mainTheme.white,
    paddingBottom: 50,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 10,
  },

  rowItem: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
  },

  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: mainTheme.text,
  },

  imageIcon: {
    width: 50,
    height: 50,
  },

  imageAvatar: {
    width: SCREEN.width - 100,
    height: SCREEN.width - 100,
    alignSelf: 'center',
    borderRadius: 500,
    borderWidth: 8,
    borderColor: mainTheme.background,
  },

  updateView: {
    padding: 20,
  },

  updateText: {
    fontSize: 20,
    color: mainTheme.white,
    backgroundColor: mainTheme.logo,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default styles;
