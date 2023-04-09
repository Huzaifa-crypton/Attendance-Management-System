import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("AttendanceManagementSystemTEST.db", undefined, undefined, undefined, (db) => { console.log('CREATED SUCCESSFULLY', db) });
    return db;
}

const db = openDatabase();
export default db