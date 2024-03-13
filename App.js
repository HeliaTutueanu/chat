import { StatusBar } from 'expo-status-bar';
import { StyleSheet, LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDm_cgSxk6txwe5JIXKPvA7yJ68Yku53Mc",
    authDomain: "chat-bf0dc.firebaseapp.com",
    projectId: "chat-bf0dc",
    storageBucket: "chat-bf0dc.appspot.com",
    messagingSenderId: "724155080196",
    appId: "1:724155080196:web:78c70d793b6327c8539f51"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
            {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;