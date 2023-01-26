import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPage } from '../screens';
import { AccountScreen } from '../screens/AccountScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
// import { handleLogout } from '../components/AvatarMenu';
import ContentScreen from '../screens/ContentScreen';
import { useEggsUserContext } from '../components/EggsUserProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../config';

const Stack = createStackNavigator();

export const AppStack = () => {
  const navigation = useNavigation();

  //to stop sound on logout
  const { sound, setSound } = useEggsUserContext();
  const handleLogout = async () => {
    await sound.pauseAsync();
    await sound.unloadAsync();
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  return (
    <Stack.Navigator
      initialRouteName='Login'
      // screenOptions={{ headerShown: true }}
    >
      {/* <Stack.Screen name='Map' component={MapPage} /> */}
      {/* <Stack.Screen name='Account' component={AccountScreen} /> */}
      <Stack.Screen
        name='Map'
        component={MapPage}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit-to-app'
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
      <Stack.Screen
        name='Content'
        component={ContentScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit-to-app'
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
      <Stack.Screen
        name='Account'
        component={AccountScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit'
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          )
        }}
      />
      <Stack.Screen
        name='Friends'
        component={FriendsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Entypo name='chevron-left' size={24} color='black' />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit'
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

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 16
  }
});
