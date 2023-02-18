import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, IconButton, Modal } from 'react-native-paper';
import { AuthenticatedUserContext } from '../providers';
import { useEggsUserContext } from '../providers/EggsSoundProvider';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

// embedded this in AppStack since useContext hook required for sound player state (and no hooks in non-component functions)
const AvatarMenu = ({ visible, handleMenu, navigation, userStats }) => {
  const authContext = useContext(AuthenticatedUserContext);
  const styles = useContext(StyleSheetContext);
  const { userInfo, handleLogout: authLogout } = authContext;
  const { sound, setSound } = useEggsUserContext();

  const handleLogout = () => {
    if (sound) {
      sound.pauseAsync();
      sound.unloadAsync();
      setSound(undefined);
    }
    authLogout();
  };

  const allFound = userStats?.allFoundPercentage;
  return (
    <Modal style={styles.avatarModal} visible={visible} onDismiss={handleMenu}>
      {/* <View style={styles.closeX}>
        <Pressable>
          <IconButton
            icon='window-close'
            iconColor={'gold'}
            containerColor={`#111111`}
            onPress={() => handleMenu()}
            size={23}
          />
        </Pressable>
      </View> */}
      <View>
        <Text style={styles.modalText}>
          Welcome,{' '}
          {userInfo?.firstname == null || userInfo?.firstname == ''
            ? userInfo?.email
            : userInfo?.firstname}
          !
        </Text>
        {allFound ? (
          <Text style={styles.modalText}>
            You have discovered {allFound}% of all available eggs
          </Text>
        ) : null}
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
