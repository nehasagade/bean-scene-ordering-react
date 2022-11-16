import { StyleSheet } from "react-native";
import Colours from "../constants/Colours";

export default StyleSheet.create({
    // GENERIC
    container: {
        flex: 1,
        backgroundColor: Colours.white,
    }, 
    // BUTTONS
    btnGroupContainer: {
        width: '90%',
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnMedium: {
        backgroundColor: Colours.beanDarkBlue,
        marginHorizontal: 10,
        marginVertical: 5,
        height: 50,
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSmall: {
        backgroundColor: Colours.beanDarkBlue,
        margin: 10,
        height: 50,
        borderRadius: 5,
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnLargeContainer: {
        width: '90%',
        height: 50,
        margin: 'auto',
        marginVertical: 15,
        borderRadius: 5,
    },
    btnLarge: {
        width: '100%',
        height: '100%',
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: Colours.beanDarkBlue,
        fontSize: 20,
        padding: 5,
        borderRadius: 5,
    },
    btnText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colours.white,
        textAlign: 'center',
    },  
    // LOGIN LOGOS
    logoContainer: {
        width: '90%',
        alignItems: 'center',
        margin: 'auto',
        marginVertical: 30,
        backgroundColor: Colours.beanDarkBlue,
        borderRadius: 5,
    },
    logoImage: {
        borderRadius: 5,
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    // HEADER
    header: {
        backgroundColor: Colours.white,
        borderBottomColor: Colours.beanDarkBlue,
        borderBottomWidth: '3px'
    },
    headerTitle: {
        color: Colours.beanDarkBlue,
        fontWeight: 'bold',
        fontSize: 24,
        
    },
    // FORMS
    formContainer: {
        width: '90%',
        margin: 'auto',
    },
    formLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    // INPUT FIELDS
    inputTextbox: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        padding: 7,
        border: '2px solid',
        borderRadius: 5,
        color: Colours.beanDarkBlue,
        fontWeight: 'bolder',
        fontSize: 20,
    },
    inputTextArea: {
        width: '100%',
        marginBottom: 10,
        padding: 7,
        border: '2px solid',
        borderRadius: 5,
        color: Colours.beanDarkBlue,
        fontWeight: 'bolder',
        fontSize: 20,
    },
    // LISTS
    listContainer: {
        margin: '2%',
        padding: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colours.white,
        borderBottomWidth: '3px',
        borderColor: Colours.beanMidBlue

    },
    listContainerMenu: {
        // flex: 1,
        margin: '2%',
        padding: '3%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colours.white,
        borderBottomWidth: '3px',
        borderColor: Colours.beanMidBlue,
    },
    listHeading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colours.beanMidBlue,
    },
    listSubHeading: {
        fontSize: 24,
        fontweight: 'bold',
    },
    listText: {
        fontSize: 20,
    },

    // NAVBAR
    navBar: {
        backgroundColor: Colours.beanDarkBlue,
    },

    // PICKER
    pickerStyle: {
        margin: 'auto',
        marginTop: 10,
        width: '100%',
        height: 50,
        color: Colours.beanDarkBlue,
        borderColor: Colours.beanDarkBlue,
        borderRadius: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },

    // SEARCH
    searchContainer: {
        margin: 'auto',
        marginTop: '2%',
        width: '90%'
    },

    categorySearchBtn: {
        backgroundColor: Colours.white,
        borderColor: Colours.beanMidBlue, 
        borderWidth: 3,
        marginVertical: 5,
        marginHorizontal: 5,
        height: 35,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categorySearchBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colours.beanMidBlue,
        textAlign: 'center',
    },
    categorySearchBtnSelected: {
        backgroundColor: Colours.beanMidBlue, 
        borderWidth: 3,
        marginVertical: 5,
        marginHorizontal: 5,
        height: 35,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categorySearchBtnTextSelected: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colours.white,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    }
});