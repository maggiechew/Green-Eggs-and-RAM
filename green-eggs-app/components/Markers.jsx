import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import { db } from '../config';
import { AuthenticatedUserContext } from '../providers';
import {
  EggsUserContext,
  useEggsUserContext
} from '../providers/EggsSoundProvider';

export const Markers = ({ zoneEggs, eggsInRange, navigation }) => {
  const { userInfo, setUserInfo, user } = useContext(AuthenticatedUserContext);
  const userEggs = userInfo.discoveredEggs;
  const userID = user.uid;
  const { setCurrentEgg, setShowModal, setModalType } = useContext(EggsUserContext);
  
  const getCreator = async (creatorID) => {
    const creatorRef = doc(db, 'creators', creatorID);
    const docSnap = await getDoc(creatorRef);
    if (!docSnap.exists) {
      console.log('No such document!');
    } else {
      const creatorData = docSnap.data();
      return {
        creatorName: creatorData.creatorName,
        creatorAvatarURI: creatorData.creatorAvatarURI,
        creatorBlurb: creatorData.creatorBlurb
      };
    }
  };

  const newContent = async (egg) => {
    await updateDoc(doc(db, 'users', userID), {
      discoveredEggs: arrayUnion(egg.id)
    });
    const creatorInfo = await getCreator(egg.creatorID);
    const combinedEgg = {Egg: egg, Creator: creatorInfo}
    setCurrentEgg(combinedEgg);
    setModalType('newEgg')
    setShowModal(true)
    // navigation.navigate('Content');
  };
  
  const oldContent = async (egg) => {
    const creatorInfo = await getCreator(egg.creatorID);
    const combinedEgg = {Egg: egg, Creator: creatorInfo}
    setCurrentEgg(combinedEgg);
    // navigation.navigate('Content');
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
        key={`${egg.id}-${locked}-${discovered}`} //required to make markers change properly (workaround)
        coordinate={{
          latitude: egg.geopoint.latitude,
          longitude: egg.geopoint.longitude
        }}
        pinColor={locked ? 'red' : discovered ? 'yellow' : 'green'}
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
