import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

export const Markers = ({ zone, currentEggs }) => {
  console.log('Rendering some hot fresh eggos!', currentEggs);
  console.log('zone eggs are:', zone.eggs);

  return zone.eggs.map((egg) => {
    let locked = true;
    if (currentEggs?.find((foundEgg) => foundEgg.id === egg.id))
      locked = false;
    return (
      <Marker
        key={egg.id}
        coordinate={{
          latitude: egg.latitude,
          longitude: egg.longitude
        }}
        pinColor={!locked ? 'yellow' : 'red'}
        // tappable= {locked ? false : true}
        onPress={(e) => locked? console.log('too bad') : console.log('hi')}
      />
    );
  });
};
