import { StyleSheet, Dimensions } from "react-native";
import mainTheme from "../../../../assets/colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background,
        alignItems: 'center'
    },
    header: {
        width: WidthScreen,
        height: HeightScreen * 0.05,
        justifyContent: "center"
    },
    EnableBorder: {
        top: 20,
        width: WidthScreen * 0.95,
        height: 70,
        backgroundColor: mainTheme.white,
        borderRadius: 20,
    },
    FlexBorder: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    text: {
        fontSize: 18
    },
    Modalcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BorderModal: {
        width: WidthScreen * 0.95,
        height: HeightScreen * 0.35,
        backgroundColor: mainTheme.white,
        borderRadius: 25
    },
    flextopModal: {
        flex: 2.5,
        backgroundColor: mainTheme.logo,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexbodyModal: {
        flex: 5.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexboxbottomModal: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
    },
    titleModal: {
        fontSize: 18,
        color: mainTheme.white
    },
    borderInputpass: {
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderColor: mainTheme.lowerFillLogo,
        borderRadius: 40,
        justifyContent: 'center'
    },
    textinput: {
        fontSize: 16,
        width: '100%',
        height: '100%',
        paddingLeft: 10,
    },
    borderbtn: {
        width: 130,
        height: '70%',
        backgroundColor: mainTheme.logo,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbtnModal: {
        color: mainTheme.white,
        fontSize: 15
    },
    hiddenImage: {
        width: 30,
        height: 30
    },
    hiddenButton: {
        position: 'absolute',
        right :20
    },
    ViewAnimation : {
        flex :7.5,
        width :'100%',
        height : '100%',
        alignItems :"center",
        justifyContent : 'center',
        backgroundColor :'white',
        borderBottomLeftRadius : 30 , 
        borderBottomRightRadius  :30
    }

});

export default styles;