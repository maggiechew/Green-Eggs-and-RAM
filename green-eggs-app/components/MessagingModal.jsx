import { Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function MessagingModal({ visible }) {
  return (
    <Modal style={styles.modal} visible={visible} transparent>
      <View style={styles.container}></View>
      <Text style={styles.modalText}>MessagingModal</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'black',
    margin: 20,
    marginTop: 60,
    marginBottom: 200,
    padding: 20,
    zIndex: 100000,
    borderRadius: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    margin: 35
  },
  modalText: {
    fontSize: 16,
    color: 'white'
  }
});
