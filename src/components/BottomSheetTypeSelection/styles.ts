import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    viewrender: {
        width: WidthScreen,
        height: 50,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: "center"
    },
    viewSelection: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: mainTheme.lowerFillLogo,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 35
    },
    textSelection: {
        fontSize: 16,
        marginLeft: 30
    },
    Selected: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: mainTheme.logo
    }

})

export default styles;