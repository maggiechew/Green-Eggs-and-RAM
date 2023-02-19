import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MapPage } from '../screens';
import { AccountScreen } from '../screens/AccountScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { MyEggsScreen } from '../screens/MyEggsScreen';
import { useNavigation } from '@react-navigation/native';
import { ContentScreen } from '../screens/ContentScreen';

import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();

export const AppStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Map'
        component={MapPage}
        options={{
          title: 'Egg Hunter Map',
          headerTitleStyle: { color: 'gold', fontFamily: 'Lobster-Regular' },
          headerStyle: { backgroundColor: `#111111` }
        }}
      />

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
              <Entypo name='chevron-left' size={24} color={`#111111`} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name='MyEggs'
        component={MyEggsScreen}
        options={{
          headerTitleStyle: { color: 'gold', fontFamily: 'Lobster-Regular' },
          headerStyle: { backgroundColor: `#111111` },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Entypo name='chevron-left' size={24} color='gold' />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name='Content'
        component={ContentScreen}
        options={{
          headerTitleStyle: { color: 'gold', fontFamily: 'Lobster-Regular' },
          headerStyle: { backgroundColor: `#111111` },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Entypo name='chevron-left' size={24} color='gold' />
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
