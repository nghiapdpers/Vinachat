import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16
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
        width: 300,
        height: 230,
        borderRadius: 7,
        padding: 16,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 16,
        color: mainTheme.text,
        fontStyle: 'italic'
    }
})

export default styles; 