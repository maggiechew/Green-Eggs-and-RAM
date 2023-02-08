import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { IconButton } from 'react-native-paper';
import { useEggsUserContext } from '../providers/EggsSoundProvider';
import { userStats } from '../helpers/userStats';
import { useNavigation } from '@react-navigation/native';

export default function MessagingModal({ stats, modalType }) {
  const { showModal, setShowModal } = useEggsUserContext();

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
  console.log('MODAL STATS: ', stats);
  return (
    <Modal
      style={styles.modal}
      visible={showModal}
      onDismiss={() => setShowModal(false)}
      animationType='slide'
      transparent
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Animated.View style={testAnimation}>
            <IconButton
              icon='egg-outline'
              containerColor={'#ffffff'}
              onPress={() => {
                // setShowModal(false);
                // navigation.navigate('Content');
              }}
              size={90}
            />
          </Animated.View>
          {modalType === 'enterZone' && stats ? userStats(stats) : <></>}
          {modalType === 'tutorial' ? <Text>THIS IS A TUTORIAL</Text> : <></>}
          {modalType === 'newEgg' ? <Text>THIS IS A NEW EGG</Text> : <></>}

          <Text style={styles.modalText}>Messaging Modal</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setShowModal(!showModal)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalText: {
    fontSize: 16,
    color: 'black'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
