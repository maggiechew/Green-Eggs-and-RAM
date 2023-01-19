import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IconButton from '../components/IconButton';

import { MapPage } from '../screens';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { AccountScreen } from '../screens/AccountScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import ContentScreen from '../screens/ContentScreen';

const Stack = createStackNavigator();
const handleLogout = () => {
  signOut(auth).catch((error) => console.log('Error logging out: ', error));
};
export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Map"
        component={MapPage}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
      <Stack.Screen
        name="Content"
        component={ContentScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
};
