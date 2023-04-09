import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AddCourse from './AddCourse'
import ViewCourses from './ViewCourses'
import { useNavigation } from '@react-navigation/native'


const Courses = (props) => {
    let nav = useNavigation()
    const [add, onAdd] = useState(1)
    useEffect(() => {
        console.log(nav.getState().routes)

    })

    const updateCourse = () => {
        onAdd(add + 1)
    }
    return (
        <View style={[styles.container]}>
            {/* Add Students */}


            <View style={{ margin: 10 }}>
                <Text style={styles.text}>Add Course</Text>
            </View>
            <AddCourse isAdded={updateCourse}></AddCourse>

            <View style={{ margin: 10 }}>
                <Text style={styles.text}>All Courses</Text>
            </View>
            {/* View Delete Update */}
            <ViewCourses added={add}></ViewCourses>
        </View>
    )
}

export default Courses

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,

        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold'
    }
})