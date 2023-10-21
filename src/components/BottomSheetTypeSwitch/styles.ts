import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    viewSwitch: {
        width: WidthScreen,
        height: 50,
        justifyContent: 'space-between',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    switch: {
        marginRight: 10
    },
    texttitle: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight : '500'
    },
    viewWarning: {
        width: WidthScreen*0.95,
        flex: 1,
        margin: 10,
    },
    textWarning : {
        fontSize : 15,
        color : 'black',
        opacity : 0.4
    }
})

export default styles;