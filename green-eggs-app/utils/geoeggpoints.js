import {
  getDoc,
  doc,
  getDocs,
  query,
  where,
  collection
} from 'firebase/firestore';
import { db } from '../config';

export const getGeoEggPoints = async (zone) => {
  const q = query(collection(db, 'eggs'), where('zone', '==', zone.id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {});

  const data = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });

  return data;
};
