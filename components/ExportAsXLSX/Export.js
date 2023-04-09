import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
const Export = (props) => {
    const exportAttendance = () => {
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.aoa_to_sheet(props.attendance)
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet', true)

        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + `${props.subject}_Attendance.xlsx`;
        FileSystem.writeAsStringAsync(filename, base64, {
            encoding: FileSystem.EncodingType.Base64
        }).then(() => {
            Sharing.shareAsync(filename);
        });
    }
    return (
        <View>
            <Button title='Export' onPress={exportAttendance}></Button>
        </View>
    )
}

export default Export

const styles = StyleSheet.create({})