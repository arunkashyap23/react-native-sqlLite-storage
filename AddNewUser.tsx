import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UserDatabase2.db', location: 'default'});

const AddNewUser = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    db.transaction(function (txn: any) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx: any, res: any) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(255), user_state VARCHAR(255))',
              [],
            );
          } else {
            console.log('created');
          }
        },
      );
    });
  }, []);

  const saveData = () => {
    db.transaction((txn: any) => {
      txn.executeSql(
        'INSERT INTO table_user(user_name, user_email,user_state) VALUES (?,?,?)',
        [name, email, state],
        (tx: any, res: any) => {
          if (res.rowsAffected == 1) {
            navigation.goBack();
          } else {
            Alert.alert('??');
          }
        },
        (error: any) => {
          console.log('error ', error);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={text => setState(text)}
      />

      <Pressable style={styles.addButtonContainer} onPress={saveData}>
        <Text style={styles.buttonText}>Add User</Text>
      </Pressable>
    </View>
  );
};

export default AddNewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  addButtonContainer: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
