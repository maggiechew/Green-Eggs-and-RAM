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
// import { Modal } from 'react-native-paper';

export default function MessagingModal({ visible }) {
  const { showModal, setShowModal } = useEggsUserContext();

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
                // sound.unloadAsync();
                // navigation.navigate('Content');
              }}
              size={90}
            />
          </Animated.View>
          <Text style={styles.modalText}>Messaging Modal</Text>
          <Text style={styles.modalText}>
            Messdsfkjfhsdkj fsd fsd fds ag adg ads g dsa gdsakjgkdsajg as dg dsa
            gModal
          </Text>
          <Text style={styles.modalText}>Mesal</Text>
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
