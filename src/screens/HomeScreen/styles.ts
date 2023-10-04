import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: mainTheme.background
    },
    header: {
        height: HeightScreen * 0.07,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    logoText: {
        fontSize: 40,
        fontFamily: 'lobster',
        color: mainTheme.logo,
    },
    searchBorder: {
        width: 50,
        height: 50,
        backgroundColor: mainTheme.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        width: 30,
        height: 30,
        margin :20
    },
    listMessage: {
        flex: 1,
    },
    flatlistView: {
        flex: 1,
        width: WidthScreen,
        alignItems: 'center'
    },
    listfriendActive: {
        flex: 1,
    },
    listfriendMessage: {
        flex: 1,
        alignItems: 'center'
    },
    viewfriendActive: {
        margin: 5,
        alignItems: 'center',
    },
    borderfriendActive: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: mainTheme.lowerFillLogo,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textnameActive: {
        color: 'black',
        fontSize: 16
    },
    BorderMessage: {
        backgroundColor: mainTheme.white,
        width: WidthScreen * 0.95,
        height: 80,
        margin: 5,
        borderRadius: 10,
        flexDirection: 'row'
    },
    MessageAvatar: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Message: {
        flex: 8,
        justifyContent: 'center',
        left: 10
    },
    textnameMessage: {
        fontSize: 18,
        color: 'black'
    },
    createGroup: {
        width :WidthScreen*0.9,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    createGroupIcon: {
        width: 35,
        height: 35
    },
    texttitleMessage : {
        fontFamily :'lobster',
        fontSize : 24,
        opacity : 0.2
    }

})

export default styles;