import { View, Text, Image } from 'react-native';
import { db } from '../config';
import React, { useContext, useEffect } from 'react';
import { AuthenticatedUserContext } from '../providers';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

// import

const tutorialContent = () => {
  //function to update userInfo.tutorial(viewed) and updateDoc (here or in Modal??)

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
  return (
    <View>
      <Text>Welcome to Egg Hunter!</Text>
      <Text>
        Use the map to find hidden "egg zones" all around the City of Calgary...
      </Text>
      <Text>
        ... and walk up to those zones to see the eggy secrets hidden within!
      </Text>
      <Text>
        To unlock an egg and view its delicious contents, you must be within
        range of it.
      </Text>
      <Text>
        Red eggs signify that you need to get a little bit closer to view its
        contents
      </Text>
      <Text>Green eggs represent eggs that you have yet to discover!</Text>
      <Text>
        Yellow eggs tell you which eggs you can interact with, but that you have
        already "opened"
      </Text>
      <Text>Happy hunting!</Text>
    </View>
  );
};

// TODO: add TO modal and work logic into being
// when this tutorial is loaded into modal, it needs to have an additional function that sets userInfo.tutorial = true and pushes to Firebase either on load or on exit
// embed the modal in Mappage (if not already there?)
// !userInfo.tutorial && <Modal contents = {<tutorialContent />} />

export default tutorialContent;
