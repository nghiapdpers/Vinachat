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
    viewbanner: {
        flex: 3.5,
        width: WidthScreen,
        backgroundColor: 'blue'
    },
    imagebanner: {
        width: '100%',
        height: '100%'
    },
    viewtitle: {
        width: WidthScreen,
        height: 40,
        justifyContent: 'center',
    },
    texttitle: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20
    },
    InfoVerify: {
        flex: 5.7,
        width: WidthScreen,
    },
    submitStart: {
        flex: 0.8,
        width: WidthScreen,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewflexInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '80%',
        margin: 10
        // justifyContent: 'space-evenly'
    },
    imageicon: {
        width: 30,
        height: 30
    },
    fonttext: {
        fontSize: 17,
        marginLeft: 5
    },
    bordersubmit: {
        width: '90%',
        height: '90%',
        backgroundColor: mainTheme.logo,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textsubmit: {
        color: mainTheme.white,
        fontSize: 18
    }
});

export default styles;
