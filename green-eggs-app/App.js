import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          // options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App