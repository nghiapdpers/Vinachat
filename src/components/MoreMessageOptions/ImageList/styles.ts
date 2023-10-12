import {StyleSheet} from 'react-native';
import {SCREEN} from '../../../global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000e1',
  },

  image: {
    width: SCREEN.width / 3.2,
    height: (SCREEN.width / 3.2 / 3) * 4,
    marginHorizontal: (SCREEN.width - (SCREEN.width / 3.2) * 3) / 8,
    borderRadius: 10,
  },

  listContent: {
    paddingVertical: 10,
    gap: (SCREEN.width - (SCREEN.width / 3.2) * 3) / 4,
    minWidth: SCREEN.width - 10,
    alignSelf: 'center',
  },

  close: {
    width: 24,
    height: 24,
  },

  closeView: {
    position: 'absolute',
    top: 5,
    right: 5,
  },

  header: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  headerCloseText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});

export default styles;
