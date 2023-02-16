import { View, Text, Image } from 'react-native';
import { db } from '../config';
import React, { useContext, useEffect } from 'react';
import { AuthenticatedUserContext } from '../providers';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

const tutorialContent = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const userID = user.uid;

  useEffect(() => {
    const checkUserTutorial = async () => {
      await updateDoc(doc(db, 'users', userID), {
        seenTutorial: true
      });
    };
    if (user) {
      checkUserTutorial();
    }
  }, []);

  const styles = useContext(StyleSheetContext);
  return (
    <View>
      <Text style={styles.tutorialTitle}>Welcome to Egg Hunter!</Text>
      <Text style={styles.tutorialText}>
        Use the map to find hidden "egg zones" all around the City of Calgary...
      </Text>
      <Image
        source={require('../assets/zone.png')}
        style={styles.zoneTutorial}
      />
      <Text style={styles.tutorialText}>
        ... and walk up to those zones to see the eggy secrets hidden within!
      </Text>
      <Text style={styles.tutorialText}>
        To unlock an egg and view its delicious contents, you must be within
        range of it.
      </Text>
      <Text style={styles.tutorialText}>
        <Image
          source={require('../assets/eggicon_locked.png')}
          style={styles.eggIconTutorial}
        />{' '}
        eggs signify that you need to get a little bit closer to view its
        contents
      </Text>
      <Text style={styles.tutorialText}>
        <Image
          source={require('../assets/eggicon_undiscovered.png')}
          style={styles.eggIconTutorial}
        />{' '}
        eggs represent eggs that you have yet to discover!
      </Text>
      <Text style={styles.tutorialText}>
        <Image
          source={require('../assets/eggicon_unlocked.png')}
          style={styles.eggIconTutorial}
        />{' '}
        eggs tell you which eggs you can interact with, but that you have
        already "opened".
      </Text>
      <Text style={styles.tutorialText}>Happy hunting!</Text>
    </View>
  );
};

export default tutorialContent;
