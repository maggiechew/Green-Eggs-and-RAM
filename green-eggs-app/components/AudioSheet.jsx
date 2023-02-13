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

export default function AudioSheet() {
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
    setSheetOpen,
    currentEggID
  } = useContext(EggsUserContext);

  // BOTTOM SHEET setup
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['20%', '64%'], []);
  const handleSheetChanges = useCallback((index) => {}, []);
  const handleClosePress = () => bottomSheetRef.current.close();
  // ^^ BOTTOM SHEET SETUP ^^

  useEffect(() => {
    if (currentEgg) {
      setSheetOpen(0);
    }
    if (currentEgg === null) {
      console.log('I SHOULD CLOSE SHEET NOW');
      setSheetOpen(-1);
      handleClosePress();
    }
  }, [currentEgg]);

  useEffect(() => {
    console.log('SHEET OPEN?: ', sheetOpen);
  }, [sheetOpen]);

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
