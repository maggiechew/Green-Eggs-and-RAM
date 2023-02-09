import { StyleSheet, Text, View } from 'react-native';
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext
} from 'react';
import { IconButton } from 'react-native-paper';
import { EggContent } from './EggContent';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { EggsUserContext } from '../providers/EggsSoundProvider';
import AudioPlayer from './AudioPlayer';

export default function AudioSheet({ visible }) {
  const {
    isPlayerReady,
    setIsPlayerReady,
    isPlaying,
    setIsPlaying,
    sound,
    setSound,
    currentEgg,
    setCurrentEgg,
    sheetOpen,
    setSheetOpen
  } = useContext(EggsUserContext);

  // BOTTOM SHEET setup
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['20%', '64%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {}, []);
  // ^^ BOTTOM SHEET SETUP ^^

  //   useEffect(() => {
  //     if (!isPlaying && currentEgg) {
  //       setSheetOpen(0);
  //     }
  //     if (currentEgg === null) {
  //       setSheetOpen(-1);
  //     }
  //   }, [currentEgg]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={sheetOpen}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <AudioPlayer contentButton />
      <BottomSheetScrollView>
        {currentEgg !== null ? <EggContent /> : <Text>Loading...</Text>}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
