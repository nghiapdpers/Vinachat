import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background
    },
    header: {
        height: HeightScreen * 0.07,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ViewBack: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: 'center'
    },
    searchBorder: {
        flex: 8.5,
        height: 50,
        backgroundColor: mainTheme.white,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    searchIcon: {
        width: 30,
        height: 30,
        margin: 10
    },
    flexboxsearchIcon: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexboxInput: {
        flex: 7,
        justifyContent: "center",
    },
    Textinput: {
        fontSize: 18,
        width: '100%'
    },
    ViewFind: {
        flex: 1,
        width: WidthScreen,
        alignItems: 'center'
    },
    borderFind: {
        width: WidthScreen * 0.95,
        height: 75,
        backgroundColor: mainTheme.white,
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row'
    },
    topItem: {
        flex: 2,
        justifyContent :'center',
        alignItems :'center'
    },
    imageItem: {
        width: 65,
        height: 65,
        borderRadius: 40,
        backgroundColor: mainTheme.logo
    },
    bodyItem: {
        flex: 5.5,
        justifyContent :'center'
    },
    endItem: {
        flex: 2.5,
        justifyContent :'center',
        alignItems :'center'
    },
    btnstatusfriend : {
        width : '90%',
        height : 30,
        backgroundColor :mainTheme.logo,
        borderRadius : 30,
        justifyContent :'center',
        alignItems :'center'
    },
    textItemName : {
        fontSize : 18,
        marginLeft : 5
    },
    mobile : {
        fontSize : 13,
        marginLeft : 5

    }
})

export default styles;