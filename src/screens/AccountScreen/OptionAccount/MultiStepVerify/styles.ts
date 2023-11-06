import { StyleSheet, Dimensions } from 'react-native';
import mainTheme from '../../../../assets/colors';
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainTheme.background,
        alignItems: 'center',
    },
    header: {
        width: WidthScreen,
        height: HeightScreen * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        width: WidthScreen,
    },
    bottom: {
        width: WidthScreen,
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 0.6,
        borderColor: '#999999'
    },
    BottomStep: {
        flex: 6.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    BottomBtn: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderBtn: {
        width: '95%',
        height: '80%',
        backgroundColor: mainTheme.logo,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        color: 'black',
        fontSize: 18
    },
    borderStep: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: mainTheme.logo,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    },
    BottomStepView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Line: {
        width: '100%',
        height: 5,
        backgroundColor: mainTheme.logo,
        position: 'absolute',
        left: 5
    },
    BackStepView: {
        position: 'absolute',
        right: 20
    },
    backsteptext: {
        fontSize: 16,
        color: mainTheme.logo
    },
    viewTitle: {
        width: WidthScreen,
        height: 40,
        justifyContent: 'center',
        marginTop: 10
    },
    textTitle: {
        fontSize: 18,
        marginLeft: 10
    },
    textDescription: {
        fontSize: 15,
        opacity: 0.5,
        marginLeft: 10,
        color: 'black',
        maxWidth: '95%'
    },
    ViewVerify: {
        flex: 1,
        width: WidthScreen,
        alignItems: 'center',
    },
    IDCard: {
        width: '70%',
        height: '70%',
        opacity: 0.6
    },
    BtnGetPicture: {
        width: WidthScreen,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnpickerImg: {
        flexDirection: 'row',
        width: '50%',
        height: '90%',
        borderWidth: 1,
        borderColor: "#2196f3",
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    CameraPicker: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 2
    },
    textpickerimage: {
        color: "#2196f3",
        fontSize: 16,
        fontWeight: '600'
    },
    viewInfo: {
        width: 250,
        height: 150,
        backgroundColor: '#dcdcdc',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 1.5,
    },
    flatlist: {
        width: WidthScreen,
        flex: 1,
    },
    textVerify: {
        fontSize: 18,
        margin: 10
    },
    viewImage: {
        width: WidthScreen,
        height: 150,
        alignItems :'center'
    },
    imgItem : {
        width : 250,
        height : '100%'
    }

});

export default styles;
