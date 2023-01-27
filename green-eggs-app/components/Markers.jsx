import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

export const Markers = ({ zone }) => {
  return zone.eggs.map((egg) => {
    return (
      <Marker
        key={egg.id}
        coordinate={{
          latitude: egg.latitude,
          longitude: egg.longitude
        }}
        pinColor="red"
      />
    );
  });
};
