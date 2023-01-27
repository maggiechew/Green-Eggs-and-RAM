import { Text, StyleSheet, View } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const EggsUserContext = createContext(null);

export const useEggsUserContext = () => {
  return useContext(EggsUserContext);
};

export default function EggsUserProvider({ children }) {
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
