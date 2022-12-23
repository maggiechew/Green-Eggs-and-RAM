import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import AuthPage from './pages/AuthPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='HomePage'
      screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          // options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="MapPage" component={MapPage} />
        <Stack.Screen name="AuthPage" component={AuthPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App