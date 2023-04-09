import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import db from '../../database'
// import { FancyAlert } from 'react-native-expo-fancy-alerts';
const ViewStudents = (props) => {
    const [students, setstudents] = useState([])
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Students", null, (txx, data) => {
                console.log("View Students", data.rows._array)
                setstudents(data.rows._array)
            }, (txx, err) => console.log('ERROR DATA'));
        })
    }, [props.added])
    const deleteStudent = (student) => {
        Alert.alert('Delete', `Are you sure to delete ${student}?`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete', onPress: () => {
                    console.log('Delete Pressed');
                    db.transaction((tx) => {
                        console.log("HADD")
                        tx.executeSql(`DELETE FROM MarkedAttendance WHERE StudentRegistration = '${student}'`, null, (txx, data) => {
                            console.log("DELETED MARKED ATTENDANCE")
                            db.transaction(tran => {
                                tran.executeSql(`DELETE FROM Students WHERE RegistrationNumber = '${student}'`, null, (txx2, data) => {
                                    console.log("DELETED STUDENT")
                                    Alert.alert('Success', "Deleted Student Successfully")
                                    setstudents(students.filter(s => s.RegistrationNumber !== student))
                                }

                                    ,
                                    (txx, err) => {
                                        Alert.alert('', "Some error occured, could not delete the student")
                                    }
                                )
                            })
                        }, (txx, err) => { console.log(err), Alert.alert('', "Some error occured, could not delete the student") })
                    })
                }
            },
        ])

    }
    const updateStudent = (student) => {

    }
    const StudentItem = ({ student }) => {
        return (
            <View style={[styles.container, { borderBottomColor: 'grey', borderBottomWidth: 0.30, flexDirection: 'row' }]}>
                <View >
                    <Text style={styles.text}>{student.RegistrationNumber}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => updateStudent(student.RegistrationNumber)}>
                        <Image style={styles.logo} source={require('../../assets/edit.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteStudent(student.RegistrationNumber)}>
                        <Image style={styles.logo} source={require('../../assets/delete.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    return (
        <View style={[styles.container1]}>
            <FlatList

                data={students}
                renderItem={({ item }) => <StudentItem student={item} />}
                keyExtractor={item => item.RegistrationNumber}
            />
        </View>
    )

}

export default ViewStudents

const styles = StyleSheet.create({
    container1: {
        // flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: '95%',
        padding: 5
    }, container: {
        // flexDirection: 'row',
        // flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: '95%',
        padding: 5
    },
    text: {
        margin: 10,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    }
    , logo: {
        margin: 10,
        height: 30,
        width: 30,
        resizeMode: 'contain'
    }
})