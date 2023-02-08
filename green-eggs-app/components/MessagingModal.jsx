import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
// import { Modal } from 'react-native-paper';

export default function MessagingModal({ visible }) {
  const [modalVisible, setModalVisible] = useState(visible);

  const hideModal = () => setModalVisible(false);

  return (
    <Modal
      style={styles.modal}
      visible={modalVisible}
      onDismiss={hideModal}
      animationType='slide'
      transparent
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Messaging Modal</Text>
          <Text style={styles.modalText}>
            Messdsfkjfhsdkj fsd fsd fds ag adg ads g dsa gdsakjgkdsajg as dg dsa
            gModal
          </Text>
          <Text style={styles.modalText}>Mesal</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
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
