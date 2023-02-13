import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config';

export const EggsUserContext = createContext(null);

export const useEggsUserContext = () => {
  return useContext(EggsUserContext);
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
