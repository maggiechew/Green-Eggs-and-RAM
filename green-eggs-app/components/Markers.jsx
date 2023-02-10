import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { AuthenticatedUserContext } from '../providers';
import { auth, db } from '../config';

const { userInfo, user } = React.useContext(AuthenticatedUserContext);
const userEggs = userInfo.discoveredEggs;
const userID = user.uid;

const newContent = async (eggID) => {
const newEggArray = userEggs.push(eggID)
  await updateDoc(doc(db, 'users', userID), {eggs: arrayUnion(eggID)})
  userInfo.eggs = newEggArray;
  //TODO: modal with newContent helper in it
}


export const Markers = ({ zoneEggs, eggsInRange, navigation }) => {
  const { userInfo } = React.useContext(AuthenticatedUserContext);
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
        pinColor={locked ? 'red' : discovered? 'green' : 'yellow' }
        onPress={() =>
          locked ? console.log('too bad') : discovered? navigation.navigate('Content'): newContent(egg.id)
        }

        // TODO: modal with stillUnlocked loaded when egg pressed but not in range (or that can be moved to this component if need be)
      />
    );
  });
};
