import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import GlobalStyle from '../../GlobalStyle'
const Header = () => {
    return (

        <SafeAreaView style={GlobalStyle.AndroidSafeArea}>
            <View style={styles.headerText}>
                <Text style={{ display: 'flex', color: 'black', marginHorizontal: 10, fontWeight: 'bold', textAlign: 'center', fontFamily: 'sans-serif', padding: 20, fontSize: 22 }
                }>Attendance System</Text>
            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create(
    {
        headerText: {
            color: 'white',
            minHeight: 0,
            borderBottomColor: 'grey',
            borderBottomWidth: StyleSheet.hairlineWidth

        }
    }
)

export default Header