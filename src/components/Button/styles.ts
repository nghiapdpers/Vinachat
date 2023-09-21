import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        width: '50%',
        backgroundColor: mainTheme.white,
        borderRadius: 180,
        padding: 4,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        paddingVertical: 8,
        color: mainTheme.text,
        fontWeight: '500',
    }

})

export default styles; 