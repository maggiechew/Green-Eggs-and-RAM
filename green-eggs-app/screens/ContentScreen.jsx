import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const ContentScreen = () => {
    const navigation = useNavigation();

  return (
    <View>
      <Text>ContentScreen</Text>
      <Button onPress={() => navigation.navigate("Map")}>Go Back</Button>

    </View>
  )
}

export default ContentScreen