import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

export const Markers = ({ zone, currentEggs, navigation }) => {

  return zone.eggs.map((egg) => {
    let locked = true;
    if (currentEggs?.find((foundEgg) => foundEgg.id === egg.id)) locked = false;
    return (
      <Marker
        key={`${egg.id}-${locked}`} //required to make marker colors change properly (workaround)
        coordinate={{
          latitude: egg.latitude,
          longitude: egg.longitude
        }}
        pinColor={!locked ? 'yellow' : 'green'}
        onPress={(e) =>
          locked ? console.log('too bad') : navigation.navigate('Content')
        }
      />
    );
  });
};
