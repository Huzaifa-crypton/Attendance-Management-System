import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, Dimensions, Alert } from 'react-native';
import StudentAttendance from './StudentAttendance';
import SelectSubject from './SelectSubject';
import db from '../../database';
import { DatePicker } from './DatePicker';
import { useNavigation } from '@react-navigation/native';

const DropdownScreen = _props => {
    let nav = useNavigation()

    useEffect(() => {

        console.log(nav.getState().routes[nav.getState().routes.length - 1])
    })
    const [sstudents, setStudents] = useState([])
    const [ssubject, setSubject] = useState([])
    const [sdate, setDate] = useState(new Date())
    const selectedDate = (date) => {
        console.log("Rea", date)
        setDate(date)
    }
    const studentSelected = (students) => {
        setStudents(students)
    }

    const subjectSelected = (subject) => {
        setSubject(subject)
    }
    async function markAttendance() {

        //  ************* Creating an attendance in Attendances Table
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO Attendances (SubjectName , Date) VALUES (? ,?)", [ssubject, sdate.toDateString()], (txx, data) => { console.log('INSERTED ATTENDANCE', new Date().toUTCString()); }, (txx, err) => console.log('NOT INSERTED'));
        })
        var recentAttendance = null
        // ************** Marking the attendance of all students present in the MarkedAttendance Table
        db.transaction((tx) => {
            // ************** GETTING THE ID OF THE RECENTLY ADDED ATTENDANCE
            tx.executeSql("SELECT id FROM Attendances ORDER BY id DESC LIMIT 1", null, (txx, data) => {
                console.log('Recent ATTENDANCE', data.rows._array);
                recentAttendance = data.rows._array[0].id
                console.log(recentAttendance)
                if (recentAttendance) {
                    // ************** APPLYING FOREACH LOOP TO ITERATE THROUGH THE ARRAY OF PRESENT 
                    // ************** STUDENTS AND MARKING THEIR ATTENDANCE
                    sstudents.forEach(rgNo => {
                        console.log(rgNo)
                        db.transaction((tx) => {
                            tx.executeSql("INSERT INTO MarkedAttendance (Attendance , StudentRegistration) Values (? , ?)", [recentAttendance, rgNo], (txx, data) => { console.log('Attendance Marked', data); }, (txx, err) => console.log('NOT INSERTED'));
                        })

                    });
                }
                // ************** TESTING TO SEE IF ATTENDANCE IS BEING MARKED CORRECTLY
                db.transaction(tx => {
                    tx.executeSql("SELECT * FROM MarkedAttendance", null, (txx, data) => {
                        console.log("DB DATA Attendances", data.rows._array);
                    }, (txx, err) => console.log('ERROR DATA'));
                })
                db.transaction(tx => {
                    tx.executeSql("SELECT * FROM Attendances", null, (txx, data) => {
                        console.log("DB DATA Attendancesssssssssss", data.rows._array);
                    }, (txx, err) => console.log('ERROR DATA'));
                })

                Alert.alert('Success', 'Attendance Marked Successfully')


            }, (txx, err) => console.log('NOT INSERTED'));
        })


    }
    return (
        <>

            <ScrollView scrollEnabled style={styles.container}>
                <View style={styles.containerView} >
                    <View style={{ marginBottom: 30 }}>
                        <DatePicker onDateSelect={selectedDate}></DatePicker>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <SelectSubject onSubjectSelected={subjectSelected}></SelectSubject>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <StudentAttendance onStudentsSelected={studentSelected}></StudentAttendance>
                    </View>

                    <Button title='Confirm' onPress={() => { markAttendance() }}></Button>
                </View>
            </ScrollView>
        </>
    );
};

export default DropdownScreen;

const styles = StyleSheet.create({

    containerView: {
        display: 'flex',
        // backgroundColor: 'red',
        flex: 1,
        marginBottom: 50,
        height: '100%',

        justifyContent: 'space-between',
    }
    , container: {
        flex: 1,
        height: '100%',
        backgroundColor5: 'white',
        padding: 40,
    }

});