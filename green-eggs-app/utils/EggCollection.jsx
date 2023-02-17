import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { db } from '../config';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config';
import { AuthenticatedUserContext } from '../providers';

const EggCollection = () => {
  const [setUserCollection] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);
  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user?.uid);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
          return;
        } else {
          let usersData = querySnap.data();
          setUserCollection(usersData);
          const userEgg = usersData.likedEggs;
        }
      });
      return () => unsubscribe();
    }
  }, [db, user]);

};

export default EggCollection;
