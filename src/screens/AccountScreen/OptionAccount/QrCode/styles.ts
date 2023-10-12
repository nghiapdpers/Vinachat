import { StyleSheet, Dimensions } from "react-native"
const { height: HeightScreen } = Dimensions.get('window');
const { width: WidthScreen } = Dimensions.get('window');
import mainTheme from "../../../../assets/colors";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background
    },
    header: {
        width: WidthScreen,
        height: HeightScreen * 0.05,
        justifyContent: "center"
    },
    ViewQrCode: {
        flex: 1,
        width: WidthScreen,
        alignItems: "center",
        justifyContent: 'center'
    },
    BorderQR: {
        backgroundColor: mainTheme.logo,
        width: '95%',
        height: '85%',
        borderRadius: 20,
        alignItems: 'center',
        // justifyContent : 'center'
    },
    FlexboxQR: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: 10
    },
    FlexboxInfo: {
        flex: 6,
        width: '100%',
        justifyContent: "center",
    },
    BorderQRCode: {
        width: '70%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    QR: {
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    flexInfo: {
        flex: 7.5,
        borderBottomWidth: 1,
        borderColor: mainTheme.lowerFillLogo,
    },
    flexOptionInfo: {
        flex: 2.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30
    },
    imgInfoOption: {
        width: 30,
        height: 30,
    },
    ViewItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderItemOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: mainTheme.lowerFillLogo,
        alignItems: 'center',
        justifyContent: 'center'
    },
    texttitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'black',
        fontWeight: '500'
    },
    flexboxtext: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        top: 20
    },
    flexbox: {
        flex: 7,
        flexDirection: "row"
    },
    ImageInfo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInfo: {
        flex: 7,
        justifyContent: 'center'
    },
    borderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: mainTheme.background
    },
    textusername: {
        fontSize: 22
    },
    textfullname: {
        fontSize: 16
    },
    Screenshotborder: {
        backgroundColor: mainTheme.logo,
        width: WidthScreen,
        height: HeightScreen * 0.5,
        position: 'absolute',
        top: -9999,
        left: -9999
    },
    flexscreenshotqr: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexscreenshotinfo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 45
    },
    BorderQRCodeScreenshot: {
        width: '75%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StylesAlert: {
        position: "absolute",
        backgroundColor: '#333333',
    },
    textAlert: {
        fontSize: 15,
        color : "white",
        padding : 5
    }
})

export default styles;