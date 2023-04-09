import React, { useEffect, useState } from 'react'
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = (props) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        props.onDateSelect(currentDate)
    };

    const showMode = () => {
        if (Platform.OS === 'android') {
            // setShow(false);
            // for iOS, add a button that closes the picker
        }
        setShow(true)
    };

    return (
        <View style={{ borderBottomColor: 'grey', borderBottomWidth: .25, padding: 10 }} >
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }} onPress={() => showMode()}>
                <TextInput editable={false} style={{ fontSize: 20 }} placeholder={date.toDateString()} />
                <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('../../assets/calendar.png')}></Image>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    );
};