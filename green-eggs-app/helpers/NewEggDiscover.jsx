import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEggsUserContext } from '../providers/EggsSoundProvider';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  BounceIn,
  withSpring,
  withDelay
} from 'react-native-reanimated';

const NewEggDiscover = () => {
  const { showModal, setShowModal } = useEggsUserContext();
  const navigation = useNavigation();

  // ANIMATION TEST
  const testAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        // prettier-ignore
        scale: withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0.9, { duration: 600 }),
            withSpring(1.1)
          ),
          -1,
          true
        )
      }
    ]
  }));

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require('../assets/egg_crack.gif')}
      />
      <Text style={styles.bodyText}>You've discovered a new egg!</Text>
      <Pressable
        onPress={() => {
          setShowModal(false);
          navigation.navigate('Content');
        }}
      >
        <Animated.View style={testAnimation}>
          <Text style={styles.clickMeText}>
            Tap to learn more about this egg!
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default NewEggDiscover;

const styles = StyleSheet.create({
  bodyText: {
    textAlign: 'center'
  },
  clickMeText: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: -10,
    fontSize: 18
  },
  container: {
    alignItems: 'center'
  }
});
