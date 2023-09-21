import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: mainTheme.background,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2
    },
    text: {
        fontFamily: 'lobster',
        fontSize: 45,
        color: mainTheme.text
    }

})

export default styles; 