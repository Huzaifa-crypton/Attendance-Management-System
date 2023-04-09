import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import db from '../../database';


const AddCourse = (props) => {
    const [courseName, onChangeText1] = React.useState('');
    // 2020-CS-2
    // 2019/R-2020-CS-2
    const addCourse = async () => {

        db.transaction((tx) => {

            tx.executeSql(`INSERT INTO Subjects (SubjectName) VALUES ('${courseName.split(' ').join('')}')`, null, (txx, data) => { console.log('INSERTED Course'); onChangeText1(''); Alert.alert("Success", "Added Successfully") }, (txx, err) => { console.log('NOT INSERTED'); Alert.alert('', 'The course already exists') });
        })
        props.isAdded()

    }


    return (
        <View style={styles.container}>

            <TextInput
                editatble
                style={styles.input}
                textAlignVertical='top'
                numberOfLines={1}
                placeholderTextColor='grey'
                onChangeText={onChangeText1}
                placeholder='Course Name'
                value={courseName}
            />

            <View style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Button onPress={addCourse} title='Add'></Button>
            </View>
        </View>
    )
}

export default AddCourse

const styles = StyleSheet.create({
    input: {
        // height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        // flex: 1,
        width: '100%',
        margin: 20,
        // padding: 40
        // borderWidth: 1
    }
})