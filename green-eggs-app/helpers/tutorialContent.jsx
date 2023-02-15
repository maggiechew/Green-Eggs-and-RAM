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
    checkUserTutorial();
  }, []);

  const styles = useContext(StyleSheetContext);
  return (
    <View>
      <Text style={styles.tutorialTitle}>Welcome to Egg Hunter!</Text>
      <Text style={styles.tutorialText}>
        Use the map to find hidden "egg zones" all around the City of Calgary...
      </Text>
      <Text style={styles.tutorialText}>
        ... and walk up to those zones to see the eggy secrets hidden within!
      </Text>
      <Text style={styles.tutorialText}>
        To unlock an egg and view its delicious contents, you must be within
        range of it.
      </Text>
      <Text style={styles.tutorialText}>
        Red eggs signify that you need to get a little bit closer to view its
        contents
      </Text>
      <Text style={styles.tutorialText}>
        Green eggs represent eggs that you have yet to discover!
      </Text>
      <Text style={styles.tutorialText}>
        Yellow eggs tell you which eggs you can interact with, but that you have
        already "opened"
      </Text>
      <Text style={styles.tutorialText}>Happy hunting!</Text>
    </View>
  );
};

export default tutorialContent;
