import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background,
        paddingHorizontal: 16
    },
    title: {
        marginTop: 16,
        fontSize: 18,
        color: mainTheme.text,
        textDecorationLine: 'underline',
        fontStyle: 'italic'
    }
})

export default styles; 