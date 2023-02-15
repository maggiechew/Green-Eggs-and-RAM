import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Colors } from '../config';

export const StyleSheetContext = createContext(null);

export default function StyleSheetProvider({ children }) {
  return (
    <StyleSheetContext.Provider value={styles}>
      {children}
    </StyleSheetContext.Provider>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    height: 140,
    padding: 10
  },
  audioPlayer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 25,
    marginTop: 0
  },
  eggName: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: -20
  },
  animationContainer: {},
  avatarModal: {
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
    fontFamily: 'SSLight',
    fontSize: 20,
    color: 'lightblue',
    marginVertical: 5
  },
  avatarButton: {
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
  avatarButtonText: {
    fontFamily: 'SSBold',
    fontSize: 16,
    color: 'white',
    weight: 'bold'
  },
  avatarButtonClose: {
    fontFamily: 'SSBold',
    alignItems: 'flex-end',
    bottom: 240,
    marginVertical: 5
  },
  loginButtonText: {
    fontSize: 16,
    color: 'gold'
  },
  card: {
    margin: 20,
    height: '63%'
  },
  shortDescription: {
    marginBottom: 20,
    marginTop: 10
  }
});
