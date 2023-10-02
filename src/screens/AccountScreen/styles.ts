import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background,
        alignItems: 'center'
    },
    topAccount: {
        flex: 2,
        backgroundColor: mainTheme.white,
        width: WidthScreen * 0.95,
        height: '90%',
        borderRadius: 20
    },
    bodyAccount: {
        flex: 7,
        alignItems: 'center',
        top: 20
    },
    headerTopAccount: {
        flex: 5,
        flexDirection: 'row',
    },
    bodyTopAccount: {
        flex: 5,
        justifyContent: "center",
        marginLeft: 20,
    },
    AvatarUser: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: mainTheme.lowerFillLogo
    },
    AvatarUserFlexbox: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: "center"
    },
    NameUserFlexbox: {
        flex: 7.5,
        justifyContent: 'center',
    },
    UserName: {
        fontSize: 22,
    },
    fullnameUser: {
        fontSize: 14
    },
    BioFlexbox: {
        flex: 4,

        width: '90%',
    },
    HotStories: {
        flex: 6,
        width: '95%',
        borderTopWidth: 1,
        borderColor: '#f3f3f3',
    },
    textBio: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
    },
    linkAccount: {
        color: mainTheme.logo,
        fontWeight: '400',
        fontSize: 14,
        marginTop: 5,
    },
    BorderStories: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: mainTheme.logo
    },
    ViewStories: {
        margin: 5,
        left: 10,
        alignItems: 'center'
    },
    BorderOption: {
        backgroundColor: mainTheme.white,
        width: WidthScreen * 0.95,
        height: 50,
        margin: 5,
        flexDirection: "row",
        borderRadius: 10
    },
    FlexboxIcon: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FlexboxTitle: {
        flex: 8.5,
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 16
    },
    textdescription: {
        fontSize: 14,
        color: "black",
        opacity: 0.3
    },
    botAccount: {
        flex: 1,
        width: WidthScreen,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BorderSignOut: {
        width: '75%',
        height: '65%',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: mainTheme.logo,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbtnsignout : {
        fontSize :20,
    }


})

export default styles;