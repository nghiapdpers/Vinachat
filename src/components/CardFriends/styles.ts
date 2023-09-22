import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        flexDirection: 'row',
        backgroundColor: mainTheme.white,
        borderRadius: 10,
        padding: 8,
        alignItems: 'center'
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})

export default styles; 