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
    bodyedit: {
        flex: 1,
        width: WidthScreen,
        alignItems: 'center',
        marginTop: 30
    },
    viewInfo: {
        width: WidthScreen * 0.95,
        height: 90,
        alignItems: 'center'
    },
    viewtitle: {
        width: WidthScreen * 0.95,
    },
    texttitle: {
        fontSize: 18
    },
    viewdetail: {
        width: '100%',
        marginTop: 5,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        flexDirection: 'row'
    },
    textdetail: {
        fontSize: 16
    },
    icondetail: {
        width: 30,
        height: 30
    },
    iconflexborderdetail: {
        flex: 2,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoflexborderdetail: {
        flex: 8,
        height: '100%',
        justifyContent: 'center',
    },
    submit: {
        width: WidthScreen,
        height: 55,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderbtn: {
        width: '60%',
        height: '100%',
        backgroundColor: mainTheme.logo,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntext: {
        fontSize: 18
    },
    viewbtn: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10
    },
    viewbirthday: {
        flex: 1,
        height: '100%',
        justifyContent: 'center'
    },
    borderbtngender: {
        width: 100,
        height: '85%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
