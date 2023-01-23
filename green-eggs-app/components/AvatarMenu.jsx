import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Provider, Modal, Portal, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
const handleLogout = () => {
  signOut(auth).catch((error) => console.log('Error logging out: ', error));
};
const AvatarMenu = ({ visible, handleMenu }) => {
  const navigation = useNavigation();
  return (
    // <View style={{height:25}}>
    //   <Provider>
    //   <Portal>

    <Modal style={styles.modal} visible={visible} onDismiss={handleMenu}>
      <View>
        <Text style={styles.modalText}>Ms. Veronica LeStrange</Text>
        <Text style={styles.modalText}>@me.me</Text>
        <Button
          style={styles.button}
          onPress={() => navigation.push('Friends')}
        >
          <Text style={styles.buttonText}>My Friends</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>My Profile</Text>
        </Button>
        {/* Account page hidden for now */}
        {/* <Button
          style={styles.button}
          onPress={() => navigation.navigate('Account')}
        >
          <Text style={styles.buttonText}>My Account</Text>
        </Button> */}
        <Button style={styles.signOutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Button>
      </View>
    </Modal>
    //   </Portal>
    //   </Provider>
    // </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#484848',
    margin: 20,
    marginTop: 60,
    marginBottom: 100,
    padding: 20,
    color: 'white',
    zIndex: 100000
  },
  modalText: {
    color: 'white'
  },
  button: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFCC33'
  },
  signOutButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'red'
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    weight: 'bold'
  }
});

export default AvatarMenu;
