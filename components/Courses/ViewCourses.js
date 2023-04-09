import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import db from '../../database'

const ViewCourses = (props) => {
    const [courses, setcourses] = useState([])
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Subjects", null, (txx, data) => {
                console.log("View Subjects", data.rows._array)
                setcourses(data.rows._array)
            }, (txx, err) => console.log('ERROR DATA'));
        })
    }, [props.added])
    const deleteSubject = (subject) => {
        Alert.alert('Delete', `Are you sure, you want to delete the course. Deleting the course will remove all the attendance permanently`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete', onPress: () => {
                    console.log('Delete Pressed');
                    db.transaction((tx) => {
                        tx.executeSql(`SELECT id FROM Attendances WHERE SubjectName = '${subject}'`, null, (txx, data1) => {
                            console.log("Getting ids of subject being deleted", data1.rows._array)
                            data1.rows._array.forEach(element => {
                                console.log(element?.id)
                                db.transaction(tx2 => {
                                    tx2.executeSql(
                                        `DELETE FROM MarkedAttendance WHERE Attendance = ${element?.id}`, null,
                                        (txx1, data2) => {
                                            db.transaction(tx3 => {
                                                tx3.executeSql(`DELETE FROM Attendances WHERE id = ${element?.id}`, null, (txx1, data3) => {
                                                    console.log("DELETED ATTENDACE", element?.id)
                                                }, (txx, err) => console.log("COULD NOT DELETE ATTENDANCE 2"))
                                            })
                                        },
                                        (txx, err) => console.log("COULD NOT DELETE ATTENDANCE 1"))
                                })
                            })
                            db.transaction(tx4 => {
                                tx4.executeSql(`DELETE FROM Subjects WHERE SubjectName = '${subject}'`, null, (txx, data4) => {
                                    Alert.alert('Success', 'Subject Deleted Successfully');
                                    setcourses(courses.filter(s => s.SubjectName !== subject))
                                }, (txx, err) => console.log("Cannot delete subject", err))
                            })

                        },

                            (txx, err) => { console.log(err), Alert.alert('', "Some error occured, could not delete the subject") })
                    })
                }
            },
        ])

    }
    const updateSubject = (subject) => {

    }
    const SubjectItem = ({ subject }) => {
        return (
            <View style={[styles.container, { borderBottomColor: 'grey', borderBottomWidth: 0.30, flexDirection: 'row' }]}>
                <View >
                    <Text style={styles.text}>{subject.SubjectName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => updateSubject(subject.SubjectName)}>
                        <Image style={styles.logo} source={require('../../assets/edit.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSubject(subject.SubjectName)}>
                        <Image style={styles.logo} source={require('../../assets/delete.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    return (
        <View style={[styles.container1]}>
            <FlatList

                data={courses}
                renderItem={({ item }) => <SubjectItem subject={item} />}
                keyExtractor={item => item.SubjectName}
            />
        </View>
    )
}

export default ViewCourses

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