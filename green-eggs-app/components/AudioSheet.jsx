import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EggsUserContext } from '../providers/EggsSoundProvider';
import AudioPlayer from './AudioPlayer';
import { EggContent } from './EggContent';

export default function AudioSheet() {
  const {
    currentEgg,
    sheetOpen,
    setSheetOpen,
    sound,
    setSound,
    setIsPlayerReady,
    setIsPlaying
  } = useContext(EggsUserContext);
  const navigation = useNavigation();


  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['20%', '64%'], []);
  const handleSheetChanges = useCallback((index) => {}, []);
  const handleClosePress = () => bottomSheetRef.current.close();

  const audioURI = currentEgg?.Egg.eggURIs.audioURI;
  useEffect(() => {
    if (currentEgg) {
      setSheetOpen(0);
    }
    if (currentEgg === null) {
      setSheetOpen(-1);
      handleClosePress();
      if (sound) {
        sound.pauseAsync();
        sound.unloadAsync();
      }
      setSound(undefined);
      setIsPlayerReady(false);
      setIsPlaying(false);
    }
  }, [currentEgg]);

  useEffect(() => {}, [sheetOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={sheetOpen}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: `#111111` }}
      handleIndicatorStyle={{ color: 'orange', backgroundColor: 'gold' }}
    >
      {audioURI && (
        <AudioPlayer contentButton contentPage={false} fromMyEgg={false} />
      )}
      <BottomSheetScrollView>
        {currentEgg !== null ? <Pressable onPress={() => {
                navigation.navigate('Content');
              }}><EggContent /></Pressable> : <Text>Loading...</Text>}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
