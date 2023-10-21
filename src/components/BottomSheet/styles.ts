import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    bottomsheet: {
        height: HeightScreen,
        width: WidthScreen,
        backgroundColor: mainTheme.white,
        borderRadius: 30,
        position: 'absolute',
        top: HeightScreen
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    },

})

export default styles;