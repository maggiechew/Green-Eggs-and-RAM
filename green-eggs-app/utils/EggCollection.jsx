import { View, Text } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
// import { getEggCollection } from './getEggCollection';
import { AuthenticatedUserContext } from '../providers';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config';

const EggCollection = () => {
  const [usersCollection, setUserCollection] = useState([]);
  const { userInfo, user } = useContext(AuthenticatedUserContext);
  useEffect(() => {
    let collectionRef = collection(db, 'users');
    // let queryRef = query(collectionRef, where('egg', '==', true));
    const unsubscribe = onSnapshot(collectionRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No matching documents.');
        return;
      } else {
        let usersData = querySnap.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id
        }));
        setUserCollection(usersData);
        console.log('Users Data ####: ', usersData);
      }
    });
    const oneUserCollection = usersCollection.filter(
      (users) => users.DOC_ID === user?.uid
    );
    console.log("user's id: ", user?.uid);
    console.log('One User Collection!!!!: ', oneUserCollection);
    const OneUserEgg = oneUserCollection.map((user) => user.eggs);
    console.log('One User Egg!!!!: ', OneUserEgg);
    return () => unsubscribe();
  }, [db]);

  return (
    <View>
      <Text>EggCollection</Text>
    </View>
  );
};

export default EggCollection;
