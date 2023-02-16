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
import { StyleSheetContext } from '../providers/StyleSheetProvider';

const AudioPlayer = ({ contentButton }) => {
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
    duration,
    setDuration,
    position,
    setPosition
  } = useContext(EggsUserContext);

  const styles = useContext(StyleSheetContext);

  const navigation = useNavigation();

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
      loadAudio(currentEgg);
    }
    if (currentEgg === null) {
      setIsPlayerReady(false);
      unloadAudio();
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
          setDuration(status.durationMillis);
        }
        if (status.didJustFinish) {
          sound.pauseAsync();
          sound.setPositionAsync(1);
          setIsPlaying(false);
        }
      });
    }
  }, [sound, isPlayerReady]);

  async function loadAudio(passedEgg) {
    if (passedEgg !== null) {
      const { sound: soundData } = await Audio.Sound.createAsync(
        { uri: passedEgg.Egg.eggURIs.audioURI },
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
    <View style={contentButton ? styles.modal : styles.modalSmall}>
      {!currentEgg ? (
        <Text style={styles.eggName}>'No egg loaded'</Text>
      ) : contentButton ? (
        <Text style={styles.eggName}>{currentEgg.Egg.eggName}</Text>
      ) : (
        <></>
      )}
      <View style={styles.audioPlayer}>
        {contentButton ? (
          <Animated.View style={testAnimation}>
            <IconButton
              icon='egg-outline'
              iconColor='gold'
              containerColor={'black'}
              onPress={() => {
                navigation.navigate('Content');
              }}
              size={40}
            />
          </Animated.View>
        ) : (
          <></>
        )}

        {isPlaying ? (
          <IconButton
            icon='pause-circle'
            iconColor='gold'
            containerColor={'black'}
            onPress={() => pausePlayAudio()}
            size={35}
          />
        ) : (
          <IconButton
            icon='play-circle'
            iconColor='gold'
            containerColor={'black'}
            onPress={() => pausePlayAudio()}
            size={35}
          />
        )}

        <Slider
          style={{ width: 170, height: 30 }}
          minimumValue={0}
          maximumValue={1}
          value={calculateSeekBar()}
          minimumTrackTintColor={'orange'}
          maximumTrackTintColor={'dimgrey'}
          thumbTintColor={'gold'}
          onValueChange={(value) => {
            setPosition(value * duration);
          }}
          onSlidingComplete={async (value) => {
            await sound.setPositionAsync(value * duration);
            // setPosition(value * duration);
          }}
          step={0.01}
        />
        <Text style={{ color: 'gold', marginLeft: 8 }}>
          -{renderCurrentTime()}
        </Text>
      </View>
    </View>
  );
};

export default AudioPlayer;
