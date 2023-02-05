import { db } from '../config';
import { collection, doc, getDocs } from 'firebase/firestore';

export const getUserRecord = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  console.log('querySnapshot#####: ', querySnapshot);
  const userRecord = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
  console.log('userRecord#####: ', userRecord);
  const data = userRecord.map((item) => {
    return {
      id: item.id,
      eggs: item.eggs.map((doc) => {
        return {
          id: doc.id,
          ...doc.id
        };
      })
    };
  });
  console.log('data#####: ', data);
  return data;
};
