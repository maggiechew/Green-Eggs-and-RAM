import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useContext } from 'react';
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
import { StyleSheetContext } from '../providers/StyleSheetProvider';

const NewEggDiscover = () => {
  const { showModal, setShowModal } = useEggsUserContext();
  const navigation = useNavigation();
  const styles = useContext(StyleSheetContext);

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
    <View style={styles.newEggContainer}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require('../assets/egg_crack_gold.gif')}
      />
      <Text style={styles.newEggBodyText}>You've discovered a new egg!</Text>
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
