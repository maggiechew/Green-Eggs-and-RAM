import { Text, StyleSheet, View } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config';
import { auth } from '../config';
import { collection, doc, getDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

export const EggsUserContext = createContext(null);

export const useEggsUserContext = () => {
  return useContext(EggsUserContext);
};

export const getEgg = async (eggID) => {
  const eggRef = doc(db, 'eggs', eggID);
  const docSnap = await getDoc(eggRef);
  console.log('Egg docSnap', docSnap);
  if (!docSnap.exists) {
    console.log('No such document!');
  } else {
    const eggData = docSnap.data();
    return {
      eggCoordinates: eggData.eggCoordinates,
      eggDescription: eggData.eggDescription,
      eggName: eggData.eggName,
      eggURIs: eggData.eggURIs
    };
  }
};

export default function EggsSoundProvider({ children }) {
  const [currentEgg, setCurrentEgg] = useState(null);
  const [sound, setSound] = useState(undefined);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const eggSoundValue = {
    currentEgg,
    setCurrentEgg,
    sound,
    setSound,
    isPlayerReady,
    setIsPlayerReady,
    isPlaying,
    setIsPlaying
  };

  return (
    <EggsUserContext.Provider value={eggSoundValue}>
      {children}
    </EggsUserContext.Provider>
  );
}
