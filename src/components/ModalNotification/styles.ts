import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    Modalcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BorderModal: {
        width: WidthScreen * 0.95,
        height: HeightScreen * 0.35,
        backgroundColor: mainTheme.white,
        borderRadius: 25
    },
    flextopModal: {
        flex: 2.5,
        backgroundColor: mainTheme.logo,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    flexbodyModal: {
        flex: 5.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexboxbottomModal: {
        flex: 2,
        alignItems: 'center',
    },
    borderbtn: {
        width: 130,
        height: '70%',
        backgroundColor: mainTheme.logo,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbtnModal: {
        color: mainTheme.white,
        fontSize: 15
    },
    logoText: {
        fontSize: 40,
        fontFamily: 'lobster',
        color: mainTheme.white,
    },
    imagewarning: {
        width: 50,
        height: 50
    },
    text: {
        fontSize: 24,
        
    }

})

export default styles;