import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthenticatedUserContext } from '../providers';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { updateDoc } from 'firebase/firestore';

const SaveEgg = () => {
  const { userInfo } = useContext(AuthenticatedUserContext);
  const [eggInContent, setEggInContent] = useState(null);

  useEffect(() => {
    if (userInfo.likedEggs === null) {
      console.log('Need to save egg.');
    } else {
      setEggInContent(userInfo.likedEggs);
      console.log('Egg already saved.');
    }
  }, [userInfo.likedEggs]);

  const removeEgg = async (passedid) => {
    try {
      const result = eggInContent.filter((item) => item.id !== passedid);
      await updateDoc(doc(db, 'users', user?.uid), {
        likedEggs: result
      });
    } catch (error) {
      console.log('Error removing egg: ', error);
    }
  };
  console.log('eggInContent: ', eggInContent);

  return (
    <View>
      <Text>SaveEgg</Text>
    </View>
  );
};

export default SaveEgg;
