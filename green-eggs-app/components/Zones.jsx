import { View, Text } from 'react-native';
import React from 'react';
import MapView, { Callout, Marker, Polygon } from 'react-native-maps';
import { Markers } from './Markers';

export const Zones = ({ arrayOfZones, zoneToHide, currentEggs }) => {
  return arrayOfZones.map((zone) => {
    if (zone.id !== zoneToHide?.id) {
      return (
        <Polygon
          key={zone.id}
          coordinates={zone.points}
          fillColor={zone.fillColor}
          strokeWidth={0}
        />
      );
    }
    return <Markers zone={zone} currentEggs={currentEggs}/>;
  });
};
