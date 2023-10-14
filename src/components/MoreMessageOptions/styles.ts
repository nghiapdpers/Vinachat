import {StyleSheet} from 'react-native';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    rowGap: 10,
  },

  imageIcon: {
    width: 50,
    height: 50,
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

  scrollContent: {
    rowGap: 10,
  },

  imagesView: {
    columnGap: 7,
    alignItems: 'center',
  },

  imagePress: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: mainTheme.logo,
    borderRadius: 10,
    borderStyle: 'dotted',
    justifyContent: 'center',
  },

  addMoreImage: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    color: mainTheme.text,
    textAlign: 'center',
  },
});

export default styles;
