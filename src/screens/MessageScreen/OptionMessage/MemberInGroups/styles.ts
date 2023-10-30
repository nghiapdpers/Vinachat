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
    borderItem: {
        width: WidthScreen,
        height: 70,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: '#e3e3e3',
        alignItems: 'center'
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
    ViewListMember: {
        height: HeightScreen,
        width: WidthScreen,
        backgroundColor: mainTheme.white,
        borderRadius: 30,
    },
    role: {
        marginRight: 10,
        fontSize: 14,
    }

});

export default styles;
