import { StyleSheet, Dimensions } from "react-native";
const { height: HeightScreen } = Dimensions.get('window');
const { width: WidthScreen } = Dimensions.get('window');
import mainTheme from "../../../assets/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainTheme.background
  },
  headerbar: {
    width: WidthScreen,
    height: HeightScreen * 0.05,
    justifyContent: 'center'
  },
  ViewCamera: {
    flex: 1,
    alignItems: 'center'
  },
  ScanQRView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  LineScan:
  {
    position: 'absolute',
    width: '100%',
    height: 335,
    left: 0,
    right : 0,
    top: 215,
    bottom:0
  }


})

export default styles;