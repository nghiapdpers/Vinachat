import { StyleSheet } from 'react-native';
import mainTheme from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainTheme.background,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    color: mainTheme.text,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    paddingLeft: 10,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: mainTheme.background,
  //   paddingHorizontal: 16,
  // },
  // title: {
  //   marginTop: 16,
  //   fontSize: 18,
  //   color: mainTheme.text,
  //   textDecorationLine: 'underline',
  //   fontStyle: 'italic',
  // },
  textEmpty: {
    fontSize: 30,
    color: '#818181',
    opacity: 0.6,
  },

  requestListEmpty: {
    fontSize: 16,
    fontWeight: '500',
    color: mainTheme.logo,
  },

  requestContentList: {
    marginHorizontal: 15,
  },

  line: {
    marginTop: 15,
    height: 2,
    width: '100%',
    backgroundColor: 'black',
  },
});

export default styles;
