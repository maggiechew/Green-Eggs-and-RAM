import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

export const Markers = ({ zoneEggs, eggsInRange, navigation }) => {

  return zoneEggs?.map((egg) => {
    console.log(egg.id)
    console.log('IM IN RANGE', eggsInRange)
    let locked = true;
    if (eggsInRange?.find((foundEgg) => foundEgg.id === egg.id)) locked = false;
    return (
      <Marker
        key={`${egg.id}-${locked}`} //required to make marker colors change properly (workaround)
        coordinate={{
          latitude: egg.geopoint.latitude,
          longitude: egg.geopoint.longitude
        }}
        pinColor={!locked ? 'yellow' : 'green'}
        onPress={(e) =>
          locked ? console.log('too bad') : navigation.navigate('Content')
        }
      />
    );
  });
};
