import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'

export default function MainNav() {
    const navigation = useNavigation()
    const [active, setActive] = useState('Home')
    const navButtonPressed = (nav) => {
        setActive(nav)
        navigation.navigate(nav)

    }
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => { navButtonPressed('Home') }}>
                <Text style={styles.text}>Home</Text>
                {active === 'Home' ?
                    <View style={styles.activeLine} /> : <View></View>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navButtonPressed('Attendance') }}>
                <Text style={styles.text}>Attendances</Text>
                {active === 'Attendance' ?
                    <View style={styles.activeLine} /> : <View></View>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navButtonPressed('Students') }}>
                <Text style={styles.text}>Students</Text>
                {active === 'Students' ?
                    <View style={styles.activeLine} ></View> : <View></View>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navButtonPressed('Courses') }}>
                <Text style={styles.text}>Courses</Text>
                {active === 'Courses' ?
                    <View style={styles.activeLine} ></View> : <View></View>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "space-around"
    },
    text: {
        fontFamily: 'sans-serif',
        textAlign: 'center',
        height: 50,
        padding: 10
    }
    ,
    activeLine: {
        borderBottomColor: 'green',
        borderBottomWidth: 3,

    }
})