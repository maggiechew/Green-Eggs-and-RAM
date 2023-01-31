import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import React, { useContext } from 'react';
import { Provider, Modal, Portal, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { EggsUserContext, useEggsUserContext } from './EggsUserProvider';
import AddProfile from './AddProfile';
import { AuthenticatedUserContext } from '../providers';

// embedded this in AppStack since useContext hook required for sound player state (and no hooks in non-component functions)
// export const handleLogout = () => {
//   signOut(auth).catch((error) => console.log('Error logging out: ', error));
// };
const AvatarMenu = ({ visible, handleMenu, navigation }) => {
  // const navigation = useNavigation();

  //to stop sound on logout
  const handleLogout = () => {
    sound.pauseAsync();
    sound.unloadAsync();
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };
  const { sound, setSound } = useEggsUserContext();

  return (
    // <View style={{height:25}}>
    //   <Provider>
    //   <Portal>

    <Modal style={styles.modal} visible={visible} onDismiss={handleMenu}>
      <View>
        <AddProfile />
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
    //   </Portal>
    //   </Provider>
    // </View>
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
    fontSize: 16,
    color: 'white'
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
