import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import db from '../../database';
import { useFocusEffect } from '@react-navigation/native';


const SelectSubject = _props => {


    const [subject, setsubject] = useState([{ 'SubjectName': 'No Subject Found' }])
    useFocusEffect(
        React.useCallback(() => {
            db.transaction(tx => {
                tx.executeSql("SELECT * FROM Subjects", null, (txx, data) => {
                    console.log("DB DATA", data.rows._array); setsubject(data.rows._array)
                }, (txx, err) => console.log('ERROR DATA'));
            })
            return () => { }
        }, []),)
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Subjects", null, (txx, data) => {
                console.log("DB DATA", data.rows._array); setsubject(data.rows._array)
            }, (txx, err) => console.log('ERROR DATA'));
        })
    }, [])
    const [dropdown, setDropdown] = useState(null);



    const _renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.SubjectName}</Text>
                <Image style={styles.icon} source={require('../../assets/tick.png')} />
            </View>
        );
    };

    return (
        <>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={subject}
                search
                searchPlaceholder="Search"
                labelField="SubjectName"
                valueField="SubjectName"
                label="Dropdown"
                placeholder="Select Subject"
                value={dropdown}
                onChange={item => {
                    setDropdown(item.SubjectName);
                    _props.onSubjectSelected(item.SubjectName)
                    console.log('selected', item);
                }}
                renderLeftIcon={() => (
                    <Image style={styles.icon} source={require('../../assets/account.png')} />
                )}
                renderItem={item => _renderItem(item)}
                textError="Error"
            />

        </>
    );
};

export default SelectSubject;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        padding: 40,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.25,
        // marginTop: 20,
        // marginBottom: 10,
        paddingBottom: 10,
        paddingLeft: 5
    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});