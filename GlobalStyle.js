import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    AndroidSafeArea: {
        // flex: 1,
        // height: 400,
        backgroundColor: "white",
        marginTop: Platform.OS === 'android' ? 30 : 0
    },
});