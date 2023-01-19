import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { Button } from './Button';
import Slider from '@react-native-community/slider';

const AudioPlayer = ({ egg }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(undefined);
  const [position, setPosition] = useState(0);
  const [sound, setSound] = useState(undefined);
  useEffect(() => {
    loadAudio(egg);
  }, []);

  async function loadAudio(egg) {
    const { sound } = await Audio.Sound.createAsync(
      { uri: egg.uri },
      { shouldPlay: false }
    );
    setSound(sound);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setIsPlayerReady(true);
        console.log('STATUS: ', isPlayerReady);
        setDuration(status.durationMillis);
        setPosition(1);
      }
    });
  }

  async function pausePlayAudio() {
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isPlaying) setIsPlaying(true);
      else setIsPlaying(false);
    });
    if (isPlayerReady && !isPlaying) await sound.playAsync();
    if (isPlayerReady && isPlaying) await sound.pauseAsync();
  }

  function calculateSeekBar() {
    if (isPlayerReady && position) {
      seekAudio();
      return position / duration;
    }

    // if (currentAudio.lastPosition) {
    //   return currentAudio.lastPosition / (currentAudio.duration * 1000);
    // }

    return 0;
  }

  async function seekAudio() {
    sound.setOnPlaybackStatusUpdate((status) => {
      if (isPlayerReady) setPosition(status.positionMillis);
      // console.log(status.positionMillis);
    });
    return position / duration;
  }

  const convertTime = (minutes) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split('.')[0];
      const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);
      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }

      if (sec == 60) {
        return `${minute + 1}:00`;
      }

      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }

      if (sec < 10) {
        return `${minute}:0${sec}`;
      }

      return `${minute}:${sec}`;
    }
  };

  const renderCurrentTime = () => {
    // if (!context.soundObj && currentAudio.lastPosition) {
    //   return convertTime(currentAudio.lastPosition / 1000);
    // }
    return convertTime(position / 1000);
  };

  return (
    <View>
      <Text>status: {isPlayerReady} </Text>
      <Text>name: {egg.eggName} </Text>
      <Text>duration: {duration} </Text>
      <Text>position: {renderCurrentTime()} </Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={calculateSeekBar()}
        // minimumTrackTintColor={color.FONT_MEDIUM}
        // maximumTrackTintColor={color.ACTIVE_BG}
        onValueChange={(value) => {
          setPosition(value * duration);
        }}
        // onSlidingStart={async () => {
        //   if (!context.isPlaying) return;

        //   try {
        //     await pause(context.playbackObj);
        //   } catch (error) {
        //     console.log('error inside onSlidingStart callback', error);
        //   }
        // }}
        onSlidingComplete={async (value) => {
          await sound.setPositionAsync(value * duration);
          setPosition(value * duration);
        }}
      />
      <Button style={styles.button} onPress={() => pausePlayAudio()}>
        <Text>Play</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFCC33',
    textColor: 'white'
  }
});

export default AudioPlayer;
