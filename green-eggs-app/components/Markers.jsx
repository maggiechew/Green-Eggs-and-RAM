import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import { db } from '../config';
import { AuthenticatedUserContext } from '../providers';
import { EggsUserContext } from '../providers/EggsSoundProvider';

export const Markers = ({ zoneEggs, eggsInRange, navigation }) => {
  const { userInfo, setUserInfo, user } = useContext(AuthenticatedUserContext);
  const userEggs = userInfo.discoveredEggs;
  const userID = user.uid;
  const { setCurrentEgg, currentEgg } = useContext(EggsUserContext);
  
  const newContent = async (eggID) => {
    console.log('You discovered me!');
    await updateDoc(doc(db, 'users', userID), {
      discoveredEggs: arrayUnion(eggID)
    });
    setCurrentEgg(eggID);
    //TODO: modal with newContent helper in it
    navigation.navigate('Content');
  };
  
  const oldContent = (eggID) => {
    // const { setCurrentEgg, currentEgg } = useContext(EggsUserContext);
    console.log('I got here', currentEgg)
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
            ? oldContent(egg)
            : newContent(egg)
        }
      />
    );
  });
};
