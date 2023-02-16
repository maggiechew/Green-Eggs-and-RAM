import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useContext } from 'react';
import {
  Provider,
  Modal,
  Portal,
  Button,
  IconButton
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config';
import {
  EggsUserContext,
  useEggsUserContext
} from '../providers/EggsSoundProvider';
import { AuthenticatedUserContext } from '../providers';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

// embedded this in AppStack since useContext hook required for sound player state (and no hooks in non-component functions)
const AvatarMenu = ({ visible, handleMenu, navigation }) => {
  const { sound, setSound } = useEggsUserContext();
  const authContext = useContext(AuthenticatedUserContext);
  const styles = useContext(StyleSheetContext);
  const { userInfo, handleLogout: authLogout } = authContext;
  const handleLogout = () => {
    if (sound) {
      sound.pauseAsync();
      sound.unloadAsync();
    }
    authLogout();
  };

  return (
    <Modal style={styles.avatarModal} visible={visible} onDismiss={handleMenu}>
      <View style={styles.closeX}>
        <Pressable>
          <IconButton
            icon='window-close'
            iconColor={'gold'}
            containerColor={'black'}
            onPress={() => handleMenu()}
            size={23}
          />
        </Pressable>
      </View>
      <View>
        <Text style={styles.modalText}>
          Welcome,{' '}
          {userInfo?.firstname == null || userInfo?.firstname == ''
            ? userInfo?.email
            : userInfo?.firstname}
          !
        </Text>
        <Text style={styles.modalText}>
          Display Name: {userInfo?.firstname + ' ' + userInfo?.lastname}{' '}
        </Text>
        <Text style={styles.modalText}>Login email: {userInfo?.email}</Text>

        {/* <View style={styles.avatarButtonClose}>
          <Button onPress={() => handleMenu()}>
            <Text style={styles.avatarButtonText}>Close</Text>
          </Button>
        </View> */}
        <View style={styles.bottom}>
          <Button
            style={styles.avatarButton}
            onPress={() => navigation.navigate('MyEggs')}
          >
            <Text style={styles.avatarButtonText}>My Eggs Collection</Text>
          </Button>
          <Button style={styles.signOutButton} onPress={handleLogout}>
            <Text style={styles.avatarButtonText}>Sign Out</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AvatarMenu;
