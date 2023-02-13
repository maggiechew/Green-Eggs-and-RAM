import { View, Text } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config';

const EggCollection = () => {
  const [usersCollection, setUserCollection] = useState([]);
  const { userInfo, user } = useContext(AuthenticatedUserContext);
  useEffect(() => {
    if (user) {
      // console.log('user!!!: ', Object.keys(user?.user));
      const docRef = doc(db, 'users', user?.uid);
      console.log('docRef: ', docRef);
      // let queryRef = query(collectionRef, where('egg', '==', true));
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        console.log('querySnap: ', querySnap);
        if (querySnap.empty) {
          console.log('No matching documents.');
          return;
        } else {
          let usersData = querySnap.data();
          setUserCollection(usersData);
          //   console.log('usersData!!!: ', usersData);
          const userEgg = usersData.likedEggs;
          console.log('One User Egg!!!!: ', userEgg);
        }
      });
      return () => unsubscribe();
    }
  }, [db, user]);

  return (
    <View>
      <Text>EggCollection</Text>
    </View>
  );
};

export default EggCollection;
