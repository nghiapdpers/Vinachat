import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background
    },
    header: {
        width: WidthScreen,
        height: HeightScreen * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    topbody: {
        width: WidthScreen,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchbody: {
        paddingVertical: 10,
        width: WidthScreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    friendbody: {
        flex: 7.8,
        width: WidthScreen,
        alignItems: 'center'
    },
    imagegroupchat: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#818181',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flextopbodyimage: {
        flex: 3,
        alignItems: 'center',
        justifyContent: "center"
    },
    flextopbodyname: {
        flex: 7,
        justifyContent: 'center'
    },
    imagecamera: {
        width: 45,
        height: 45
    },
    bordernamegroup: {
        width: '95%',
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1.5,
        borderColor: '#818181'
    },
    textinput: {
        width: '100%',
        height: '100%',
        fontSize: 16,
        marginLeft: 5,
    },
    borderseach: {
        width: '90%',
        height: 40,
        backgroundColor: mainTheme.white,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imagesearch: {
        width: 30,
        height: 30,
        margin: 10
    },
    borderItem: {
        width: WidthScreen * 0.95,
        height: 60,
        flexDirection: "row",
        margin: 5,
    },
    SelectFlex: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageFlex: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    NameFlex: {
        flex: 6.5,
        justifyContent: 'center'
    },
    SelectCheckbox: {
        borderWidth: 1,
        borderColor: mainTheme.lowerFillLogo,
        width: 25,
        height: 25,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageItem: {
        width: 60,
        height: 60,
        backgroundColor: mainTheme.logo,
        borderRadius: 40
    },
    textnameItem: {
        fontSize: 16
    },
    textactive: {
        fontSize: 13,
        color: '#818181'
    },
    memberSelected: {
        width: 19,
        height: 19,
        borderRadius: 20,
        backgroundColor: mainTheme.logo
    },
    BottomSelect: {
        width: WidthScreen,
        height: 60,
        backgroundColor: mainTheme.background,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 1,
    },

    BottomSelectFlex: {
        flex: 7,
    },
    BottomSelectFlexbtn: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCreate: {
        width: '90%',
        height: 50,
        backgroundColor: mainTheme.logo,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbtnCreate: {
        fontSize: 15,
        color: '#fff'
    },
    SelectBottomItem: {
        width: 60,
        height: '100%',
        marginTop: 5,
        marginLeft: 10,
        alignItems: 'center',
    },
    imageBottomSelect: {
        width: 50,
        height: 50,
        backgroundColor: mainTheme.logo,
        borderRadius: 30
    },
    imageremove: {
        width: 20,
        height: 20,
    },
    potisionremove: {
        position: 'absolute',
        right: 0,
    }

})

export default styles;