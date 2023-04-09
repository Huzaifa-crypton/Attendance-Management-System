import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ViewStudents from './ViewStudents'
import AddStudent from './AddStudent'

const Students = (props) => {
    const [add, onAdd] = useState(1)
    const updateStudents = () => {
        console.log("asdsd")
        onAdd(add + 1)
    }
    return (

        <View style={[styles.container]}>
            {/* Add Students */}


            <View style={{ margin: 10 }}>
                <Text style={styles.text}>Add Students</Text>
            </View>
            <AddStudent isAdded={updateStudents}></AddStudent>

            <View style={{ margin: 10 }}>
                <Text style={styles.text}>All Students</Text>
            </View>
            {/* View Delete Update */}
            <ViewStudents added={add}></ViewStudents>
        </View>
    )
}

export default Students

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    }
})