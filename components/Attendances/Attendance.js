import { StyleSheet, ScrollView, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import db from '../../database'
import { useFocusEffect } from '@react-navigation/native'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import SelectSubject from '../AttendanceMarking/SelectSubject';
import Export from '../ExportAsXLSX/Export';

const Attendance = () => {

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            // console.log(list[i], obj)
            if (list[i].Date === obj.Date && list[i].StudentRegistration === obj.StudentRegistration && list[i].SubjectName === obj.SubjectName) {
                return true;
            }
        }

        return false;
    }
    const [attendance, setattendance] = useState([])
    const [dates, setdates] = useState([])
    const [width, setwidth] = useState([])
    const [ssubject, setSubject] = useState('')


    const subjectSelected = (subject) => {
        console.log(subject)
        setSubject(subject)
    }
    useEffect(() => {
        if (ssubject != '') {

            var att = []
            db.transaction(tx => {
                var std = []

                tx.executeSql("SELECT * FROM Students", null, (txx, data) => {
                    console.log("DB DATA", data.rows._array)
                    std = data.rows._array
                }, (txx, err) => console.log('ERROR DATA'));
                tx.executeSql(`SELECT a.Date,a.SubjectName,ma.StudentRegistration FROM MarkedAttendance AS ma JOIN (SELECT * FROM Attendances WHERE SubjectName = '${ssubject}') AS a WHERE a.id = ma.Attendance `, null, (txx, data) => {
                    att = data.rows._array
                    console.log("att", att)
                    var date = []
                    date = att.map(e => {
                        return e?.Date
                    })
                    date = [...new Set(date)]
                    var attendances = []
                    std.forEach((e) => {
                        var temp = []
                        date.forEach((d) => {
                            (containsObject({ "Date": d, "StudentRegistration": e.RegistrationNumber, "SubjectName": ssubject }, att)) ? (temp.push('P')) : (temp.push('A'))
                        })
                        temp.unshift(e.RegistrationNumber)
                        attendances.push(temp)
                    })
                    date.unshift(' ');
                    attendances.unshift(date)
                    setdates(date)
                    setattendance(attendances)
                    setwidth(new Array(date.length).fill(100))
                    console.log(dates)
                    console.log(attendances)
                    console.log(width)
                }, (txx, err) => console.log(err))

            })
        }
    }, [ssubject])
    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 30 }}>
                <SelectSubject onSubjectSelected={subjectSelected}></SelectSubject>
                {ssubject != '' && attendance != [] ? <Export subject={ssubject} attendance={attendance} /> : <View />}

            </View>
            <ScrollView horizontal={true}>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                        {
                            attendance.map((dataRow, index) => (
                                <Row
                                    key={index}
                                    data={dataRow}
                                    widthArr={width}
                                    style={styles.row}
                                    textStyle={styles.text}
                                />
                            ))
                        }
                    </Table>
                </ScrollView>
            </ScrollView>
        </View>
    )
}

export default Attendance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#ffffff'
    },
    head: {
        height: 50,
        backgroundColor: '#fff',
    },
    text: {
        textAlign: 'center',
        fontWeight: '200'
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 40,
        backgroundColor: '#F7F8FA'
    }
});