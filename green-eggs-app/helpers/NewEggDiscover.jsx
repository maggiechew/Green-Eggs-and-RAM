import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEggsUserContext } from '../providers/EggsSoundProvider';

const NewEggDiscover = () => {
  const { showModal, setShowModal } = useEggsUserContext();
  const navigation = useNavigation();
  return (
    <View>
      <Image
        style={{ width: 200, height: 200 }}
        source={require('../assets/egg_crack.gif')}
      />
      <Text>You've discovered a new egg!</Text>
      <Pressable
        onPress={() => {
          setShowModal(false);
          navigation.navigate('Content');
        }}
      >
        <Text>See more about this egg!</Text>
      </Pressable>
    </View>
  );
};

export default NewEggDiscover;

const styles = StyleSheet.create({});
