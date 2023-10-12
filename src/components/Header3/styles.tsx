import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width :WidthScreen,
        height :'100%',
        flexDirection: 'row',
        justifyContent :'center',
        alignItems: 'center'
    },
    texttitle: {
        fontSize: 24,
        alignItems: 'center'
    },
    image: {
        width: 30,
        height: 30,
    },
    potisionImage: {
        position: 'absolute',
        left : 20
    }


})

export default styles;