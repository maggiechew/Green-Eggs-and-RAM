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
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { EggsUserContext } from '../providers/EggsSoundProvider';
import { useNavigation } from '@react-navigation/native';
import { convertTime } from '../utils/audioHelpers';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

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
    setCurrentEgg,
    sheetOpen,
    setSheetOpen
  } = useContext(EggsUserContext);

  const navigation = useNavigation();

  // BOTTOM SHEET setup
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['20%', '64%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {}, []);
  // ^^ BOTTOM SHEET SETUP ^^

  // ANIMATION TEST
  const testAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        // prettier-ignore
        scale: withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0.8, { duration: 400 })
          ),
          -1,
          true
        )
      }
    ]
  }));

  useEffect(() => {
    if (!isPlaying && currentEgg) {
      // console.log('USEFFECT1: loadaudio');
      loadAudio(currentEgg);
      setSheetOpen(0);
    }
    if (currentEgg === null) {
      setIsPlayerReady(false);
      unloadAudio();
      setSheetOpen(-1);
    }
  }, [currentEgg]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded && currentEgg) {
          loadAudio(currentEgg);
        }
        if (!status.isLoaded && !currentEgg) {
          setIsPlayerReady(false);
        }
        if (status.isLoaded && !isPlayerReady) {
          setIsPlayerReady(true);
        }
        if (isPlayerReady) {
          setPosition(status.positionMillis);
        }
        if (status.isLoaded && !status.isPlaying) {
          // setIsPlayerReady(true);
          setDuration(status.durationMillis);
          // if (position === 0) setPosition(1);
        }
        if (status.didJustFinish) {
          sound.pauseAsync();
          sound.setPositionAsync(1);
          setIsPlaying(false);
        }
      });
    }
  }, [sound, isPlayerReady]);

  async function loadAudio(egg) {
    if (egg !== null) {
      const { sound: soundData } = await Audio.Sound.createAsync(
        { uri: egg.eggURIs.audioURI },
        { shouldPlay: false }
      );
      setSound(soundData);
      setIsPlayerReady(true);
      setIsPlaying(false);
    }
  }

  async function unloadAudio() {
    if (sound) {
      await sound.pauseAsync();
      await sound.unloadAsync();
    }
    setSound(undefined);
    setIsPlayerReady(false);
    setIsPlaying(false);
  }

  async function pausePlayAudio() {
    if (!isPlaying && isPlayerReady) {
      await sound.playAsync();
      setIsPlaying(true);
    }
    if (isPlaying && isPlayerReady) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  function calculateSeekBar() {
    if (currentEgg === null) {
      return 0;
    }
    if (isPlayerReady && position) {
      return position / duration;
    }
  }

  const renderCurrentTime = () => {
    return convertTime((duration - position) / 1000);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={sheetOpen}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.modal}>
        {!currentEgg ? (
          <Text style={styles.eggName}>'No egg loaded'</Text>
        ) : (
          <Text style={styles.eggName}>{currentEgg.eggName}</Text>
        )}
        <View style={styles.audioPlayer}>
          <Animated.View style={testAnimation}>
            <IconButton
              icon='egg-outline'
              containerColor={'#ffffff'}
              onPress={() => {
                // sound.unloadAsync();
                navigation.navigate('Content');
              }}
              size={40}
            />
          </Animated.View>

          {isPlaying ? (
            <IconButton
              icon='pause-circle'
              containerColor={'#ffffff'}
              onPress={() => pausePlayAudio()}
              size={35}
            />
          ) : (
            <IconButton
              icon='play-circle'
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
      </View>
      <BottomSheetScrollView>
        {currentEgg !== null ? <EggContent /> : <Text>Loading...</Text>}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    height: 140,
    padding: 10
  },
  audioPlayer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 25,
    // marginBottom: 20,
    marginTop: 0
  },
  eggName: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: -20
  },
  animationContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    // top: 8,
    // bottom: 0,
    // left: 0,
    // right: 4
  }
});

export default AudioPlayer;
