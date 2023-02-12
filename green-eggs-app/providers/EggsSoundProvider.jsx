import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';
import { db } from '../config';

export const EggsUserContext = createContext(null);

export const useEggsUserContext = () => {
  return useContext(EggsUserContext);
};

export const getEgg = async (eggID) => {
  const eggRef = doc(db, 'eggs', eggID);
  const docSnap = await getDoc(eggRef);
  // console.log('Egg docSnap', docSnap);
  if (!docSnap.exists) {
    console.log('No such document!');
  } else {
    const eggData = docSnap.data();
    return {
      eggCoordinates: eggData.eggCoordinates,
      eggDescription: eggData.eggDescription,
      eggName: eggData.eggName,
      eggURIs: eggData.eggURIs,
      creatorID: eggData.creatorID,
      eggBlurb: eggData.eggBlurb
    };
  }
};

export const getCreator = async (creatorID) => {
  const creatorRef = doc(db, 'creators', creatorID);
  const docSnap = await getDoc(creatorRef);
  // console.log('Creator docSnap', docSnap);
  if (!docSnap.exists) {
    console.log('No such document!');
  } else {
    const creatorData = docSnap.data();
    return {
      creatorName: creatorData.creatorName,
      creatorAvatarURI: creatorData.creatorAvatarURI,
      creatorBlurb: creatorData.creatorBlurb
    };
  }
};

export default function EggsSoundProvider({ children }) {
  const [currentEgg, setCurrentEgg] = useState(null);
  const [sound, setSound] = useState(undefined);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState(undefined);
  const [position, setPosition] = useState(0);
  const [currentEggID, setCurrentEggID] = useState(null);
  // MODAL STATES: enterZone, tutorial, newEgg
  const [modalType, setModalType] = useState('newEgg');

  const eggSoundValue = {
    currentEgg,
    setCurrentEgg,
    sound,
    setSound,
    isPlayerReady,
    setIsPlayerReady,
    isPlaying,
    setIsPlaying,
    sheetOpen,
    setSheetOpen,
    showModal,
    setShowModal,
    duration,
    setDuration,
    position,
    setPosition,
    currentEggID,
    setCurrentEggID,
    modalType,
    setModalType
  };

  return (
    <EggsUserContext.Provider value={eggSoundValue}>
      {children}
    </EggsUserContext.Provider>
  );
}
