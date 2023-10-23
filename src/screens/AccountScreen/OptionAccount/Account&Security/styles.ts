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
    viewTitle: {
        width: WidthScreen,
        height: 40,
        justifyContent: 'center',
        margin: 10,
    },
    textTitle: {
        fontSize: 20,
        color: mainTheme.logo,
    },
    viewborder: {
        height: 50,
        width: WidthScreen,
        backgroundColor: mainTheme.white,
        borderBottomWidth: 0.5,
        borderColor: '#e3e3e3',
        justifyContent: 'center'
    },
    textoption: {
        fontSize: 16,
        marginLeft: 10
    },
    viewborderSwitch: {
        height: 50,
        // width: WidthScreen,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: mainTheme.white,
        borderBottomWidth: 0.5,
        borderColor: '#e3e3e3',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switch: {
        marginRight: 10
    },
    imageborder: {
        width: 25,
        height: 25,
        position : 'absolute',
        right : 20,
        transform : [{rotate : '180deg'}],
        opacity : 0.5
    }
});

export default styles;
