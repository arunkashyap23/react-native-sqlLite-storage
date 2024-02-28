import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UserDatabase2.db', location: 'default'});

const UpdateUser = (props: any) => {
  const {navigation, route} = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [state, setState] = useState('');

  console.log(email);

  useEffect(() => {
    setName(route.params.name);
    setEmail(route.params.email);
    setState(route.params.state);
  }, []);

  const updateUser = () => {
    db.transaction((txn: any) => {
      txn.executeSql(
        'UPDATE table_user set user_name=?,user_email=?,user_state=? where user_id=?',
        [name, email, state, route.params.id],
        (tex: any, res: any) => {
          navigation.goBack();
        },
        (error: any) => {
          console.log(error);
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
        onChangeText={(text: any) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={text => setState(text)}
      />

      <Pressable style={styles.addButtonContainer} onPress={updateUser}>
        <Text style={styles.buttonText}>Update User</Text>
      </Pressable>
    </View>
  );
};

export default UpdateUser;

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
