import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Audio } from 'expo-av';
import { Button } from './Button';

// const egg = {
//   uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/testAudio.mp3?alt=media&token=205f5509-c396-4fae-a174-c40f7c587efd',
//   eggName: 'egg name is cool!'
// };

const AudioPlayer = ({ egg }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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
      if (status.isLoaded) setIsPlayerReady(true);

      console.log('STATUS: ', isPlayerReady);
      // display eggName
      // display time left
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

  // async function seekAudio() {}

  return (
    <View>
      <Text>status: {isPlayerReady} </Text>
      <Text>name: {egg.eggName} </Text>
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
