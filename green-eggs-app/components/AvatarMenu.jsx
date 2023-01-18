import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Provider, Modal, Portal, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AudioPlayer from './AudioPlayer';

const AvatarMenu = ({ visible, handleMenu }) => {
  const navigation = useNavigation();

  // TEST FOR EGG // AUDIOPLAYER
  const egg = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/testAudio.mp3?alt=media&token=205f5509-c396-4fae-a174-c40f7c587efd',
    eggName: 'egg name is cool!'
  };

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
          onPress={() => navigation.navigate('Friends')}
        >
          My Friends
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          My Profile
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Account')}
        >
          My Account
        </Button>
        <AudioPlayer egg={egg} />
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
    backgroundColor: '#FFCC33',
    textColor: 'white'
  }
});

export default AvatarMenu;
