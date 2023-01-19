import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IconButton from '../components/IconButton';
import { Button } from 'react-native-paper';
import { MapPage } from '../screens';
import { AccountScreen } from '../screens/AccountScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
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
          headerTintColor: 'red',
          headerStyle: { backgroundColor: 'blue' },
          headerLeft: () => (
            <Button
              style={{ marginLeft: 20 }}
              onPress={() => navigation.goBack()}
            >
              Back
            </Button>
          )
        }}
      />
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  );
};
