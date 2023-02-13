import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config';

export const zonesFromDB = async () => {
  const querySnapshot = await getDocs(collection(db, 'zones'));

  const zones = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
  const data = zones.map((item) => {
    return {
      id: item.id,
      geopoints: item.geopoints.map((item) => {
        return {
          latitude: item.latitude,
          longitude: item.longitude
        };
      })
    };
  });
  return data;
};
