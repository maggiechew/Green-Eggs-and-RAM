import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import { db } from '../config';
import { AuthenticatedUserContext } from '../providers';
import { EggsUserContext } from '../providers/EggsSoundProvider';

const newContent = async (eggID) => {
  const { setCurrentEgg } = useContext(EggsUserContext);
  const userID = user.uid;
  const { userInfo, setUserInfo, user } = React.useContext(
    AuthenticatedUserContext
  );
  console.log('You discovered me!');
  await updateDoc(doc(db, 'users', userID), {
    discoveredEggs: arrayUnion(eggID)
  });
  setCurrentEgg(eggID);
  //TODO: modal with newContent helper in it
  navigation.navigate('Content');
};

const oldContent = (eggID) => {
  const { setCurrentEgg } = useContext(EggsUserContext);
  // passes EGGID so content loaded via modal
  console.log('You had already found me!');
  setCurrentEgg(eggID);
  //TODO: modal saying content already discovered
  navigation.navigate('Content');
};

const lockedContent = () => {
  console.log('Im locked, yo!');
  // TODO: modal with stillUnlocked
};

export const Markers = ({ zoneEggs, eggsInRange, navigation }) => {
  const { userInfo } = React.useContext(AuthenticatedUserContext);
  const userEggs = userInfo.discoveredEggs;

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
        onPress={() =>
          locked
            ? lockedContent()
            : discovered
            ? oldContent(egg.id)
            : newContent(egg.id)
        }
      />
    );
  });
};
