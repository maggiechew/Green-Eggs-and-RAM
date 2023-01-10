import {
  View,
  Text,
  StyleSheet,
  Modal,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import { Audio } from 'expo-av';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';

// Modal is visible or not
const AudioPlayer = ({ visible }) => {
  const [sound, setSound] = useState();
  const [button, setButton] = useState('play-circle');
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/hello-calgary-86156.appspot.com/o/testAudio.mp3?alt=media&token=205f5509-c396-4fae-a174-c40f7c587efd'
      },
      { shouldPlay: true }
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.setVolumeAsync(volume);
    await sound.playAsync();
  }

  async function pauseSound() {
    console.log('Pausing Sound');
    await sound.pauseAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <>
      <StatusBar hidden />
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            Egg Title. This is a very important piece of content.
          </Text>
          <View>
            <Text style={styles.subtitle}>I think about this a lot.</Text>
          </View>
          <View style={styles.controls}>
            <IconButton
              icon={button}
              iconColor={MD3Colors.Neutral10}
              mode={'contained-tonal'}
              containerColor={'#ffffff'}
              size={35}
              onPress={() => {
                if (playing === false) {
                  setPlaying(true);
                  setButton('pause-circle');
                  playSound();
                } else {
                  setButton('play-circle');
                  setPlaying(false);
                  pauseSound();
                }
              }}
            />
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={(value) => sound.setVolumeAsync(value)}
              minimumTrackTintColor="#cccccc"
              maximumTrackTintColor="#000000"
              // paddingVertical={150}
              padding={50}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
    padding: 10
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: '',
    paddingBottom: 30
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'medium',
    paddingVertical: 10,
    padding: 20,
    letterSpacing: 1
  }
});

export default AudioPlayer;
