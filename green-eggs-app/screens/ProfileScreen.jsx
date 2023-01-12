import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button onPress={() => navigation.navigate("Map")}>Go Back</Button>

    </View>
  )
}
