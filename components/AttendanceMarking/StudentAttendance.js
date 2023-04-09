import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import db from '../../database';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const StudentAttendance = _props => {
    const [data, setdata] = useState([{ 'SubjectName': 'No Subject Found' }])
    useFocusEffect(
        React.useCallback(() => {
            db.transaction(tx => {
                tx.executeSql("SELECT * FROM Students", null, (txx, data1) => {
                    console.log("DB DATA", data1.rows._array); setdata(data1.rows._array)
                }, (txx, err) => console.log('ERROR DATA'));
            })
            return () => { }
        }, []),)
    let nav = useNavigation()
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Students", null, (txx, data1) => {
                console.log("DB DATA", data1.rows._array); setdata(data1.rows._array)
            }, (txx, err) => console.log('ERROR DATA'));
        })

    }, [])
    // useEffect(() => {
    //     console.log(nav.getState().routes[nav.getState().routes.length - 1])
    // })

    const [selected, setSelected] = useState([]);

    const _renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.RegistrationNumber}</Text>
                <Image style={styles.icon} source={require('../../assets/tick.png')} />
            </View>
        );
    };

    return (
        <>

            <MultiSelect
                style={styles.dropdown}
                data={data}
                labelField="RegistrationNumber"
                valueField="RegistrationNumber"
                label="Multi Select"
                placeholder="Select Present Students"
                search
                searchPlaceholder="Search"
                selectedStyle={{}}
                renderLeftIcon={() => (
                    <Image style={styles.icon} source={require('../../assets/account.png')} />
                )}
                selectedTextStyle={{ height: 30 }}
                value={selected}
                onChange={item => {
                    setSelected(item);
                    _props.onStudentsSelected(item)
                    console.log('selected', item);
                }}
                renderItem={item => _renderItem(item)}
            />
        </>
    );
};

export default StudentAttendance;

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.25,
        // marginTop: 20,
        // marginBottom: 10,
        paddingBottom: 10
        , paddingLeft: 5
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