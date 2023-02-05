import { db } from '../config';
import { collection, doc, getDocs } from 'firebase/firestore';

export const testFolder = async () => {
  const querySnapshot = await getDocs(collection(db, 'zone'));
  console.log('querySnapshot!!!!!!: ', querySnapshot);

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

//firebase.firestore().collection('sample').where('uid', '=', firebase.auth().currentUser.uid).get().then((querySnapshot) => { querySnapshot.forEach((doc) => { console.log(doc.id, ' => ', doc.data()); }); });

//get ( fieldPath :  string | FieldPath ,  options ? :  SnapshotOptions ) : any
//SnapshotOptions { serverTimestamps: 'estimate' | 'previous' | 'none' }

// get ( fieldPath: "eggs/", options?: SnapshotOptions ): any
