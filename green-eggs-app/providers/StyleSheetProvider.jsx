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
    height: 140,
    padding: 10
  },
  modalSmall: {
    height: 70,
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
    marginBottom: -20,
    color: 'gold'
  },
  animationContainer: {},
  avatarModal: {
    backgroundColor: `#111111cc`,
    flex: 1,
    justifyContent: 'flex-end',
    theme: 'dark',
    margin: 20,
    marginTop: 60,
    marginBottom: 270,
    padding: 20,
    zIndex: 100000,
    borderRadius: 20
  },
  modalText: {
    fontSize: 16,
    color: 'gold',
    marginVertical: 5,
    marginLeft: 13,
    fontWeight: 'bold'
  },
  avatarButton: {
    marginVertical: 10,
    marginHorizontal: 10,
    textColor: 'white',
    backgroundColor: 'orange',
    marginTop: 30
  },
  signOutButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'red',
    marginBottom: 30
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
  },
  tutorialTitle: {
    color: 'gold'
  },
  tutorialText: {
    color: 'white'
  },
  newEggBodyText: {
    textAlign: 'center',
    color: 'white'
  },
  clickMeText: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: -10,
    fontSize: 18,
    color: 'gold'
  },
  newEggContainer: {
    alignItems: 'center'
  },
  closeX: {
    marginLeft: 270,
    marginBottom: 110,
    padding: 0,
    bottom: 0
  },
  eggIconTutorial: {
    width: 28,
    height: 28
  },
  zoneTutorial: {}
});
