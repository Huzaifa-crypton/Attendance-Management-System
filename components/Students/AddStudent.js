import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import db from '../../database';
const AddStudent = (props) => {
    const [rgno1, onChangeText1] = React.useState('');
    const [rgno2, onChangeText2] = React.useState('');
    // 2020-CS-2
    // 2019/R-2020-CS-2
    const addStudent = async () => {
        console.log("ADD")
        if (addType === 'single') {
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO Students (RegistrationNumber) VALUES ('${rgno1.split(' ').join('')}')`, null, (txx, data) => { console.log('INSERTED'); onChangeText1(''); onChangeText2(''); Alert.alert("Success", "Added Successfully") }, (txx, err) => { console.log('NOT INSERTED'); Alert.alert('', 'The registration number already exists') });
            })
        }
        else {

            let temp1 = rgno1.split(' ').join('').split('-') //Splliting with the dashes to get the roll number
            let temp2 = rgno2.split(' ').join('').split('-')
            let temp3 = [...temp2]
            temp3.pop()                 // In order to get the Registration number, we remove the number from 
            // the array and
            temp3 = temp3.join('-')     // then join it with the '-' giving us 2020-CS as a result

            temp1 = temp1[temp1.length - 1]
            temp2 = temp2[temp2.length - 1]
            console.log(temp1)

            console.log(temp2)
            // ('2020-CS-2'),('2020-CS-4')
            let val = ''
            for (let i = parseInt(temp1); i <= parseInt(temp2); i++) {
                console.log(temp3 + '-' + i.toString())
                val = val === '' ? `('${temp3 + '-' + i.toString()}')` : `${val},('${temp3 + '-' + i.toString()}')`

            }
            console.log(val)
            await db.transaction((tx) => {
                tx.executeSql(`INSERT INTO Students (RegistrationNumber) VALUES ${val}`, null, (txx, data) => { console.log('INSERTED'); onChangeText1(''); onChangeText2(''); Alert.alert("Success", "Added Successfully") }, (txx, err) => { console.log('NOT INSERTED'); Alert.alert('', 'The registration number already exists') });
            })
        }
        props.isAdded()

    }


    const [addType, onChangeType] = React.useState('single');
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                <Button title='Single' onPress={() => { onChangeType('single'); onChangeText1(''); onChangeText2('') }}></Button>
                <Button title='Range' onPress={() => { onChangeType('range'); onChangeText1(''); onChangeText2('') }}></Button>
            </View>
            {addType === 'single' ?
                <TextInput
                    editatble
                    style={styles.input}
                    textAlignVertical='top'
                    numberOfLines={1}
                    placeholderTextColor='grey'
                    onChangeText={onChangeText1}
                    placeholder='Single Registration Number e.g., 2020-CS-2'
                    value={rgno1}
                />
                :

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <TextInput
                        editatble
                        style={[styles.input, { flex: 1 }]}
                        multiline
                        textAlignVertical='top'
                        numberOfLines={1}
                        placeholderTextColor='grey'
                        onChangeText={onChangeText1}
                        placeholder='2020-CS-1'
                        value={rgno1}
                    />
                    <Text style={[styles.text]}>TO</Text>
                    <TextInput
                        editatble
                        style={[styles.input, { flex: 1 }]}
                        multiline
                        textAlignVertical='top'
                        numberOfLines={1}
                        placeholderTextColor='grey'
                        onChangeText={onChangeText2}
                        placeholder='2020-CS-45'
                        value={rgno2}
                    />
                </View>
            }
            <View style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Button onPress={addStudent} title='Add'></Button>
            </View>
        </View>
    )
}

export default AddStudent

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
}
)