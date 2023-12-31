import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";
import { SCREEN } from "../../global";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: 'lobster',
        fontSize: 60,
        textAlign: 'center',
        color: mainTheme.text
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000099',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        backgroundColor: mainTheme.background,
        width: SCREEN.width * 0.68,
        height: SCREEN.height * 0.3,
        borderRadius: 7,
        padding: 16,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 16,
        color: mainTheme.text,
        fontStyle: 'italic'
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
        color: mainTheme.text
    },
    textResentOTP: {
        fontSize: 16,
        marginLeft: 4
    }
})

export default styles; 