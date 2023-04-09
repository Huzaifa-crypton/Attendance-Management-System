import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header/Header';
import AttendanceMarking from './components/AttendanceMarking/AttendanceMarking';
// import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect } from 'react';

import MainNav from './components/MainNavBar/MainNav';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Attendance from './components/Attendances/Attendance';
import Students from './components/Students/Students';
import { LogBox } from 'react-native';
import Courses from './components/Courses/Courses';
import db from './database';
export default function App() {
  LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
  const dbFunc =
    () => {
      console.log("En")
      // db.transaction((tx) => {
      //   tx.executeSql('DROP TABLE IF EXISTS Attendances');
      // })
      // db.transaction((tx) => {
      //   tx.executeSql('DROP TABLE IF EXISTS Students');
      // })
      // db.transaction((tx) => {
      //   tx.executeSql('DROP TABLE IF EXISTS Subjects');
      // })
      // db.transaction((tx) => {
      //   tx.executeSql('DROP TABLE IF EXISTS MarkedAttendance');
      // })

      db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Subjects (SubjectName TEXT PRIMARY KEY )", null, (txx, data) => { console.log('CREATED SUBJECTs'); }, (txx, err) => console.log('NOT CREATED Subjects', err));
      })
      console.log("12")
      db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Students (RegistrationNumber TEXT PRIMARY KEY )", null, (txx, data) => { console.log('CREATED STUDENT'); }, (txx, err) => console.log('NOT CREATED Student', err));
      })
      db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Attendances (id INTEGER PRIMARY KEY AUTOINCREMENT , SubjectName TEXT REFERENCES Subjects(SubjectName), Date TEXT)', null, (txx, data) => { console.log('CREATED ATT1'); }, (txx, err) => console.log('NOT CREATED ATT', err));
      })
      db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MarkedAttendance (id INTEGER PRIMARY KEY AUTOINCREMENT , Attendance REFERENCES Attendances(id), StudentRegistration TEXT REFERENCES Students(RegistrationNumber))', null, (txx, data) => { console.log('CREATED ATT2'); }, (txx, err) => console.log('NOT CREATED ATT', err));
      })
      // db.transaction((tx) => {
      //   tx.executeSql("INSERT INTO Subjects (SubjectName) VALUES ('AI'),('PPSD')", null, (txx, data) => { console.log('INSERTED'); }, (txx, err) => console.log('NOT INSERTED'));
      // })
      // db.transaction((tx) => {
      //   tx.executeSql("INSERT INTO Students (RegistrationNumber) VALUES ('2020-CS-1'),('2020-CS-2'),('2020-CS-3'),('2020-CS-5'),('2020-CS-6'),('2020-CS-10'),('2020-CS-11'),('2020-CS-12'),('2020-CS-13'),('2020-CS-14')", null, (txx, data) => { console.log('INSERTED'); }, (txx, err) => console.log('NOT INSERTED'));
      // })
      db.transaction(tx => {
        tx.executeSql("SELECT * FROM Attendances", null, (txx, data) => {
          console.log("DB DATA Attendance", data.rows._array)
        }, (txx, err) => console.log('ERROR DATA'));
      })
      db.transaction(tx => {
        tx.executeSql("SELECT * FROM MarkedAttendance", null, (txx, data) => {
          console.log("DB DATA MArked Attendance", data.rows._array)
        }, (txx, err) => console.log('ERROR DATA'));
      })
      // db.transaction(tx => {
      //   tx.executeSql("SELECT * FROM Subjects", null, (txx, data) => {
      //     console.log("DB DATA", data.rows._array)
      //   }, (txx, err) => console.log('ERROR DATA'));
      // })
    }


  useEffect(() => {
    dbFunc()
  }, [db])
  const Stack = createNativeStackNavigator();
  h = []
  test = { hello: '123' }
  h.push(test)
  console.log(h)
  return (
    // <ScrollView>

    <NavigationContainer>

      <Header />
      <MainNav></MainNav>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name='Home'
          component={AttendanceMarking}

        />
        <Stack.Screen
          name='Attendance'
          component={Attendance}
        />
        <Stack.Screen
          name='Students'
          component={Students}
        />
        <Stack.Screen
          name='Courses'
          component={Courses}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // {/* // <AttendanceMarking></AttendanceMarking> */ }
    // </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
