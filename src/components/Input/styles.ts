import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: mainTheme.white,
        borderRadius: 10,
        padding: 4
    },
    title: {
        fontSize: 16,
        color: mainTheme.text,
        fontWeight: '500',
        fontStyle: 'italic'
    }

})

export default styles; 