import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import { EggsUserContext } from '../providers/EggsSoundProvider';
import { convertTime } from '../utils/audioHelpers';

const AudioPlayer = ({ contentButton, contentScreen, fromMyEgg }) => {
  const {
    isPlayerReady,
    setIsPlayerReady,
    isPlaying,
    setIsPlaying,
    sound,
    setSound,
    currentEgg,
    duration,
    setDuration,
    position,
    setPosition,
    sheetOpen
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
    // console.log('AUDIOEFFECT: ', currentEgg);
    if (
      (currentEgg && !contentScreen) ||
      (currentEgg && contentScreen && fromMyEgg)
    ) {
      loadAudio(currentEgg);
    }
    if (currentEgg === null) {
      // console.log('AUDIO: i am a null egg');
      setIsPlayerReady(false);
      unloadAudio();
      // setSound(undefined);
    }
    // console.log('audio player', currentEgg);
  }, [currentEgg]);

  useEffect(() => {
    async function justFinished() {
      await sound.pauseAsync();
      setPosition(1);
      await sound.setPositionAsync(1);
      setIsPlaying(false);
    }
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
          justFinished();
        }
      });
    }
  }, [sound, isPlayerReady]);

  async function loadAudio(passedEgg) {
    // console.log('LOAD: ', sound);
    if (sound && isPlaying) {
      // console.log('LOADAUDIO: sound and isplaying'); // UNHANDLED HERE!!
      await sound.pauseAsync();
      // await sound.unloadAsync();
      await setSound(undefined);
      setIsPlaying(false);
      setIsPlayerReady(false);
    }
    if (passedEgg !== null) {
      // console.log('LOAD AUDIO: i am loading');
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
    if (!sound) {
      return;
    }
    if (!isPlaying && isPlayerReady) {
      await sound.playAsync();
      setIsPlaying(true);
      // console.log('PLAYING: ', currentEgg);
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
              containerColor={`#111111`}
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
            containerColor={`#111111`}
            onPress={() => pausePlayAudio()}
            size={35}
          />
        ) : (
          <IconButton
            icon='play-circle'
            iconColor='gold'
            containerColor={`#111111`}
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
          onValueChange={async (value) => {
            // await sound.setPositionAsync(value * duration);
            // console.log('2');
            // await setPosition(value * duration);
          }}
          // onSlidingStart={async () => {
          //   if (!isPlaying) return;

          //   try {
          //     await pausePlayAudio();
          //   } catch (error) {
          //     console.log('error inside onSlidingStart callback', error);
          //   }
          // }}
          onSlidingComplete={async (value) => {
            try {
              const status = await sound.setPositionAsync(
                Math.floor(duration * value)
              );
              setPosition(Math.floor(duration * value));
            } catch (error) {
              console.log('error inside onSlidingComplete callback', error);
            }
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
