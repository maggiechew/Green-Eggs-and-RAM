import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useContext, useEffect, useMemo, useRef
} from 'react';
import { StyleSheet, Text } from 'react-native';
import { EggsUserContext } from '../providers/EggsSoundProvider';
import AudioPlayer from './AudioPlayer';
import { EggContent } from './EggContent';

export default function AudioSheet() {
  const {
    currentEgg,
    sheetOpen,
    setSheetOpen,
  } = useContext(EggsUserContext);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['20%', '64%'], []);
  const handleSheetChanges = useCallback((index) => {}, []);
  const handleClosePress = () => bottomSheetRef.current.close();

  useEffect(() => {
    if (currentEgg) {
      setSheetOpen(0);
    }
    if (currentEgg === null) {
      setSheetOpen(-1);
      handleClosePress();
    }
  }, [currentEgg]);

  useEffect(() => {
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
