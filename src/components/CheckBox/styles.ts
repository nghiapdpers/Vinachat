import { StyleSheet } from "react-native";
import mainTheme from "../../assets/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainTheme.lowerFillLogo,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedContainer: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: mainTheme.logo
    }

})

export default styles; 