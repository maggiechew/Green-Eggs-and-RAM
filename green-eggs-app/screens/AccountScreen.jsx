import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomNavigation, Button } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../config';

const handleLogout = () => {
  signOut(auth).catch((error) => console.log('Error logging out: ', error));
};

export const AccountScreen = ({}) => {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <Text>AccountScreen</Text>
        <Button onPress={() => navigation.navigate('Map')}>Go Back</Button>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    weight: 'bold'
  }
});
