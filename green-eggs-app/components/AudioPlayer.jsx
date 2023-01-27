import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext
} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { IconButton } from 'react-native-paper';
import { EggContent } from './EggContent';
import BottomSheet from '@gorhom/bottom-sheet';
import { EggsUserContext, useEggsUserContext } from './EggsUserProvider';
import { useNavigation } from '@react-navigation/native';
import { convertTime } from '../utils/audioHelpers';

const AudioPlayer = ({ visible }) => {
  const [duration, setDuration] = useState(undefined);
  const [position, setPosition] = useState(0);
  const {
    isPlayerReady,
    setIsPlayerReady,
    isPlaying,
    setIsPlaying,
    sound,
    setSound,
    currentEgg,
    setCurrentEgg
  } = useContext(EggsUserContext);
  // const { isPlaying, setIsPlaying } = useEggsUserContext();
  // const { sound, setSound } = useEggsUserContext();
  // const { currentEgg, setCurrentEgg } = useEggsUserContext();

  const navigation = useNavigation();

  // BOTTOM SHEET setup
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['20%', '64%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  // ^^ BOTTOM SHEET SETUP ^^

  useEffect(() => {
    console.log(isPlaying);
    if (!isPlaying) {
      console.log('USEFFECT1: loadaudio');
      loadAudio(currentEgg);
    }
  }, [currentEgg]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        console.log('sound status: ', status.isLoaded);
        // if (status.isLoaded) setIsPlayerReady(true);
        if (isPlayerReady) {
          setPosition(status.positionMillis + 1);
          console.log('i set position');
        }
        if (status.isLoaded && !status.isPlaying) {
          // setIsPlayerReady(true);
          console.log('isplayerready STATUS: ', isPlayerReady);
          setDuration(status.durationMillis);
          if (position === 0) setPosition(1);
        }
        if (status.didJustFinish) {
          console.log('sound didjustfinish: ', status.isLoaded);
          sound.pauseAsync();
          sound.setPositionAsync(1);
          setIsPlaying(false);
        }
      });
    }
  }, [sound]);

  async function loadAudio(egg) {
    if (egg !== null) {
      const { sound: soundData } = await Audio.Sound.createAsync(
        { uri: egg.uri },
        { shouldPlay: false }
      );
      setSound(soundData);
      console.log('soundData was set: ');
      setIsPlayerReady(true);
      setIsPlayerReady(true);
      setIsPlayerReady(true);
      setIsPlayerReady(true);
      setIsPlayerReady(true);
      setIsPlayerReady(true);
      setIsPlayerReady(true);
      setIsPlayerReady(true);
      console.log('soundData was set: DONE');
      // console.log('i got here just ebfore set plaey');
      // setIsPlayerReady(true);
      // console.log('i got here 64');
      // sounddata.setOnPlaybackStatusUpdate((status) => {
      //   console.log(status);
      // });
    }
  }

  async function pausePlayAudio() {
    if (!isPlaying && isPlayerReady) {
      await sound.playAsync();
      setIsPlaying(true);
    }
    if (isPlaying && isPlayerReady) {
      await sound.pauseAsync();
      console.log(position);
      setIsPlaying(false);
    }
  }

  function calculateSeekBar() {
    if (isPlayerReady && position) {
      // seekAudio();
      return position / duration;
    }
    return 0;
  }

  const renderCurrentTime = () => {
    return convertTime((duration - position) / 1000);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      {!currentEgg ? (
        <Text style={styles.eggName}>'No egg loaded'</Text>
      ) : (
        <Text style={styles.eggName}>{currentEgg.eggName}</Text>
      )}
      <Text> </Text>

      <View style={styles.audioPlayer}>
        <IconButton
          icon='egg-outline'
          containerColor={'#ffffff'}
          onPress={() => {
            // sound.unloadAsync();
            navigation.navigate('Content');
          }}
          size={35}
        />
        {isPlaying ? (
          <IconButton
            icon='play-circle'
            containerColor={'#ffffff'}
            onPress={() => pausePlayAudio()}
            size={35}
          />
        ) : (
          <IconButton
            icon='pause-circle'
            containerColor={'#ffffff'}
            onPress={() => pausePlayAudio()}
            size={35}
          />
        )}

        <Slider
          style={{ width: 170, height: 30 }}
          minimumValue={0}
          maximumValue={1}
          value={calculateSeekBar()}
          onValueChange={(value) => {
            setPosition(value * duration);
          }}
          onSlidingComplete={async (value) => {
            await sound.setPositionAsync(value * duration);
            setPosition(value * duration);
          }}
          step={0.01}
        />
        <Text>-{renderCurrentTime()}</Text>
      </View>
      <View>
        <EggContent egg={currentEgg} />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    padding: 10
  },
  audioPlayer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 25,
    marginBottom: 20,
    marginTop: 0
  },
  eggName: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: -20
  }
});

export default AudioPlayer;
