import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Provider, Modal, Portal } from 'react-native-paper';

const AvatarMenu = ({ visible, handleMenu }) => {
  return (
    // <View style={{height:25}}>
    //   <Provider>
    //   <Portal>

    <Modal style={styles.modal} visible={visible}>
      <View>
        <Text>AvatarMenu</Text>
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
    marginTop: 60,
    marginBottom: 100,
    padding: 20
  }
});

export default AvatarMenu;
