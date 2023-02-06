import { View, Text } from 'react-native';
import React from 'react';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import { Markers } from './Markers';

export const Zones = ({ zone }) => {
  return (
    <Polygon
      key={zone.id}
      coordinates={zone.geopoints}
      fillColor={'rgba(2, 27, 250, 0.5)'}
      strokeWidth={0}
    />
  );
};
