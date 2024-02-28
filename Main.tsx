import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused} from '@react-navigation/native';

const db = openDatabase({name: 'UserDatabase2.db', location: 'default'});

const Main = ({navigation}: any) => {
  const [userList, setUserList] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction((txn: any) => {
      txn.executeSql('SELECT * from table_user', [], (tex: any, res: any) => {
        let temp: any = [];
        for (let i = 0; i < res.rows.length; i++) {
          temp.push(res.rows.item(i));
        }
        setUserList(temp);
      });
    });
  };

  const deleteUser = (id: any) => {
    db.transaction((txn: any) => {
      txn.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx: any, res: any) => {
          if (res.rowsAffected == 1) {
            Alert.alert('User Deleted Successfully!!');
            getData();
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

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable style={styles.itemsContainer}>
        <Text style={styles.name}>Name : {item.user_name}</Text>
        <Text style={styles.address}>Email : {item.user_email}</Text>
        <Text style={styles.address}>State : {item.user_state}</Text>
        <View style={styles.editDeleteView}>
          <Pressable
            style={styles.box}
            onPress={() =>
              navigation.navigate('UpdateUser', {
                name: item.user_name,
                email: item.user_email,
                state: item.user_state,
                id: item.user_id,
              })
            }>
            <Text style={styles.address}>Edit</Text>
          </Pressable>
          <Pressable
            style={styles.box}
            onPress={() => deleteUser(item.user_id)}>
            <Text style={styles.address}>Delete</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {userList.length > 0 ? (
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={userList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noContentContainer}>
          <Text style={{color: 'black', fontSize: 32, fontWeight: 'bold'}}>
            No Records
          </Text>
        </View>
      )}
      <Pressable
        style={styles.addButtonContainer}
        onPress={() => navigation.navigate('AddNewUser')}>
        <Text style={styles.buttonText}>Add New User</Text>
      </Pressable>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 16,
  },
  addButtonContainer: {
    // position: 'absolute',
    // bottom: 10,
    backgroundColor: 'rgba(0, 122, 255, 1)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  noContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContentTextStyle: {
    fontSize: 22,
    color: '#e4e4e4',
    fontWeight: 'bold',
  },
  itemsContainer: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'lightgray',
    padding: 15,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: 'black',
  },
  editDeleteView: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    minWidth: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: 'black',
  },
});
