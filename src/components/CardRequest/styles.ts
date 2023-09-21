import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: mainTheme.white,
        borderRadius: 10,
        padding: 8
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 15
    }
})

export default styles; 