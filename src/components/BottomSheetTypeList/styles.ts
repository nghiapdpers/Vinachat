import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    viewrender: {
        width: WidthScreen,
        height: 60,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: "center"
    },
    viewSelection: {
        width: 90,
        height: 40,
        backgroundColor: mainTheme.logo,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 35
    },
    textname: {
        fontSize: 16,
    },
    textmobile: {
        fontSize: 14,
        color: 'black',
        opacity: 0.5
    },
    ViewInfo: {
        marginLeft: 20
    },
    imageNullItem: {
        width: 200,
        height: 200,
        opacity: 0.5,
        marginTop: 10
    },


})

export default styles;