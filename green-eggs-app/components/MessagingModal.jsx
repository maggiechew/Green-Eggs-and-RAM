import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useContext } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import NewEggDiscover from '../helpers/NewEggDiscover';
import TutorialContent from '../helpers/TutorialContent';
import { UserStats } from '../helpers/UserStats';
import { EggsUserContext } from '../providers/EggsSoundProvider';

export default function MessagingModal({ stats, modalType }) {
  const { showModal, setShowModal } = useContext(EggsUserContext);

  const navigation = useNavigation();

  // ANIMATION TEST
  const testAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        // prettier-ignore
        scale: withRepeat(
            withSequence(
              withTiming(1, { duration: 400 }),
              withTiming(0.8, { duration: 400 })
            ),
            -1,
            true
          )
      }
    ]
  }));

  const playSFX = async () => {
    const { sound: soundFX } = await Audio.Sound.createAsync(
      require('../assets/hit-fiver.mp3'),
      { shouldPlay: true }
    );
  };

  return (
    // <Animated.View style={testAnimation}>
    <Modal
      style={styles.modal}
      visible={showModal}
      onDismiss={() => setShowModal(false)}
      animationType='slide'
      transparent
      onShow={() => playSFX()}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.closeX}>
            <Pressable>
              <IconButton
                icon='window-close'
                iconColor={'gold'}
                containerColor={'black'}
                onPress={() => {
                  setShowModal(false);
                }}
                size={23}
              />
            </Pressable>
          </View>
          {modalType === 'enterZone' && stats ? (
            <UserStats userStats={stats} />
          ) : (
            <></>
          )}
          {modalType === 'tutorial' ? <TutorialContent /> : <></>}
          {modalType === 'newEgg' ? <NewEggDiscover /> : <></>}

          <Text style={styles.modalText}> </Text>
        </View>
      </View>
    </Modal>
    // </Animated.View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 120,
    marginTop: 60,
    marginBottom: 200,
    padding: 20,
    zIndex: 100000,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeX: {
    marginRight: -30,
    marginTop: -30,
    padding: 0,
    alignSelf: 'flex-end'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    fontSize: 16,
    color: 'gold'
  },
  modalView: {
    backgroundColor: 'black',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
