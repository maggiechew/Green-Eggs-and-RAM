import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPage } from '../screens';
import { AccountScreen } from '../screens/AccountScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { ContentScreen } from '../screens/ContentScreen';
import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();

export const AppStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName='Login'
      // screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name='Map' component={MapPage} />
      <Stack.Screen name='Account' component={AccountScreen} />
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
        name='Content'
        component={ContentScreen}
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 16
  }
});
