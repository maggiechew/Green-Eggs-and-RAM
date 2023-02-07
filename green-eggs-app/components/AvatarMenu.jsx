import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Provider, Modal, Portal, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
import { auth } from '../config';
import {
  EggsUserContext,
  useEggsUserContext
} from '../providers/EggsSoundProvider';
import AddProfile from './AddProfile';
import { AuthenticatedUserContext } from '../providers';

// embedded this in AppStack since useContext hook required for sound player state (and no hooks in non-component functions)
const AvatarMenu = ({ visible, handleMenu, navigation }) => {
  const authContext = useContext(AuthenticatedUserContext);
  const { userInfo, handleLogout: authLogout } = authContext;
  const handleLogout = () => {
    sound.pauseAsync();
    sound.unloadAsync();
    authLogout();
    // signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };
  const { sound, setSound } = useEggsUserContext();

  return (
    <Modal style={styles.modal} visible={visible} onDismiss={handleMenu}>
      <View>
        <Text style={styles.modalText}>
          Welcome,{' '}
          {userInfo?.firstname == null || userInfo?.firstname == ''
            ? userInfo?.email
            : userInfo?.firstname}{' '}
          !
        </Text>
        <Text style={styles.modalText}>
          Display Name: {userInfo?.firstname + ' ' + userInfo?.lastname}{' '}
        </Text>
        <Text style={styles.modalText}>Login email: {userInfo?.email}</Text>

        <View style={styles.buttonClose}>
          <Button onPress={() => handleMenu()}>
            <Text style={styles.buttonText}>Close</Text>
          </Button>
        </View>
        <View style={styles.bottom}>
          {/* MyFriends page hidden for now */}
          {/* <Button
          style={styles.button}
          onPress={() => navigation.push('Friends')}
        >
          <Text style={styles.buttonText}>My Friends</Text>
        </Button> */}
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </Button>
          {/* Account page hidden for now */}
          {/* <Button
          style={styles.button}
          onPress={() => navigation.navigate('Account')}
        >
          <Text style={styles.butt0onText}>My Account</Text>
        </Button> */}
          <Button style={styles.signOutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(72,72,72,0.8)',
    theme: 'dark',
    margin: 20,
    marginTop: 60,
    marginBottom: 200,
    padding: 20,
    zIndex: 100000,
    borderRadius: 20
  },
  modalText: {
    fontSize: 20,
    color: 'lightblue',
    marginVertical: 5
  },
  button: {
    marginVertical: 5,
    marginHorizontal: 10,
    textColor: 'white',
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
  },
  buttonClose: {
    alignItems: 'flex-end',
    bottom: 240,
    marginVertical: 5
  }
});

export default AvatarMenu;
