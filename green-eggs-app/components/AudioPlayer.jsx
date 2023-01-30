import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { IconButton } from 'react-native-paper';

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
        // console.log('STATUS: ', isPlayerReady);
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
    if (isPlayerReady && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }

    if (isPlayerReady && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  function calculateSeekBar() {
    if (isPlayerReady && position) {
      seekAudio();
      return position / duration;
    }
    return 0;
  }

  async function seekAudio() {
    sound.setOnPlaybackStatusUpdate((status) => {
      if (isPlayerReady) setPosition(status.positionMillis);
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
    return convertTime((duration - position) / 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eggName}>{egg.eggName} </Text>
      <Text> </Text>

      <View style={styles.audioPlayer}>
        {!isPlaying ? (
          <IconButton
            icon="play-circle"
            containerColor={'#ffffff'}
            onPress={() => pausePlayAudio()}
            size={35}
          />
        ) : (
          <IconButton
            icon="pause-circle"
            containerColor={'#ffffff'}
            onPress={() => pausePlayAudio()}
            size={35}
          />
        )}

        <Slider
          style={{ width: 220, height: 30 }}
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
        />
        <Text>-{renderCurrentTime()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // flex: 1,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    zIndex: 1000,
    padding: 0
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
