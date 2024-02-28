import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './Main';
import AddNewUser from './AddNewUser';
import UpdateUser from './UpdateUser';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="AddNewUser" component={AddNewUser} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0, 122, 255, 1)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
