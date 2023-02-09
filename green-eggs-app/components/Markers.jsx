import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';
import { AuthenticatedUserContext } from '../providers';

export const Markers = ({ zoneEggs, eggsInRange, navigation }) => {
  const { userInfo } = React.useContext(AuthenticatedUserContext);
  const userEggs = userInfo.likedEggs;
  return zoneEggs?.map((egg) => {
    let locked = true;
    let discovered = false;
    if (eggsInRange?.find((foundEgg) => foundEgg.id === egg.id)) locked = false;
    if (userEggs?.find((foundEgg) => foundEgg === egg.id)) discovered = true;
    return (
      <Marker
        key={`${egg.id}-${locked}-${discovered}`} //required to make marker colors change properly (workaround)
        coordinate={{
          latitude: egg.geopoint.latitude,
          longitude: egg.geopoint.longitude
        }}
        pinColor={locked ? 'red' : discovered ? 'green' : 'yellow'}
        onPress={(e) =>
          locked
            ? console.log('too bad')
            : discovered
            ? console.log('You already found me')
            : navigation.navigate('Content')
        }
      />
    );
  });
};
