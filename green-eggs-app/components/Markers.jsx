import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import { db } from '../config';
import { Alert } from 'react-native';
import { AuthenticatedUserContext } from '../providers';
import { EggsUserContext } from '../providers/EggsSoundProvider';

export const Markers = ({ zoneEggs, eggsInRange }) => {
  const { userInfo, user } = useContext(AuthenticatedUserContext);
  const userEggs = userInfo.discoveredEggs;
  const userID = user.uid;
  const { currentEgg, setCurrentEgg, setShowModal, setModalType } =
    useContext(EggsUserContext);

  const getCreator = async (creatorID) => {
    const creatorRef = doc(db, 'creators', creatorID);
    const docSnap = await getDoc(creatorRef);
    if (!docSnap.exists) {
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
    const combinedEgg = { Egg: egg, Creator: creatorInfo };
    setCurrentEgg(combinedEgg);
    setModalType('newEgg');
    setShowModal(true);
  };

  const oldContent = async (egg) => {
    if (egg !== currentEgg) {
      const creatorInfo = await getCreator(egg.creatorID);
      const combinedEgg = { Egg: egg, Creator: creatorInfo };
      setCurrentEgg(combinedEgg);
    }
  };

  const lockedContent = (egg) => {
    Alert.alert(`I'm locked!`);
  };

  return zoneEggs?.map((egg) => {
    let locked = true;
    let discovered = false;
    if (eggsInRange?.find((foundEgg) => foundEgg.id === egg.id)) locked = false;
    if (userEggs?.find((foundEgg) => foundEgg === egg.id)) discovered = true;
    return (
      <Marker
        key={`${egg.id}-${locked}-${discovered}`} //required to make markers change properly (workaround) https://github.com/react-native-maps/react-native-maps/issues/1800#issuecomment-347905340
        coordinate={{
          latitude: egg.geopoint.latitude,
          longitude: egg.geopoint.longitude
        }}
        icon={
          locked
            ? require('../assets/eggicon_locked.png')
            : discovered
            ? require('../assets/eggicon_unlocked.png')
            : require('../assets/eggicon_undiscovered.png')
        }
        pinColor={locked ? 'red' : discovered ? 'yellow' : 'green'}
        onPress={() =>
          locked
            ? lockedContent(egg)
            : discovered
            ? oldContent(egg)
            : newContent(egg)
        }
      />
    );
  });
};
