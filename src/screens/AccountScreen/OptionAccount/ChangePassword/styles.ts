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
        alignItems: 'center'
    },
    body: {
        flex: 1,
        width: WidthScreen,
    },
    border: {
        width: WidthScreen,
        height: 80,
        marginTop: 5,
        alignItems: 'center',
    },
    viewtitle: {
        width: WidthScreen,
        height: 30,
        justifyContent: 'center',
    },
    texttitle: {
        fontSize: 16,
        marginLeft: 10,
        color: mainTheme.logo
    },
    borderinput: {
        borderWidth: 1,
        backgroundColor: mainTheme.white,
        width: '95%',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewinput: {
        height: '100%',
        width: '85%',
        justifyContent: 'center',
    },
    imagebtn: {
        width: 30,
        height: 30
    },
    textinput: {
        fontSize: 16,
        marginLeft: 10
    },
    potisionimage: {
        marginRight: 10
    },
    submitview: {
        width: WidthScreen,
        height: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    warningview: {
        width: WidthScreen,
        maxWidth: '95%',
        marginLeft: 10
    },
    textwarning: {
        fontSize: 14,
        color: 'black',
        opacity: 0.4
    },
    submitborder: {
        width: '60%',
        height: '100%',
        backgroundColor: mainTheme.logo,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textsubmit: {
        fontSize: 16
    },
    errorview: {
        width: WidthScreen,
        marginTop: 10,
    },
    textwrongcondition: {
        color: 'red',
        fontSize: 14,
        marginLeft: 10
    },
    erroritem: {
        width: WidthScreen,
    }

});

export default styles;
