import { getDoc, doc, getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../config';

export const getEggGeo = async (db, id) => {
  const querySnapshot = await getDoc(doc(db, 'zone', id));
  console.log('EggquerySnapshot', querySnapshot.data());
  const dataeggnew = querySnapshot.data()?.eggs;
  console.log('Eggdatanew', dataeggnew);
  // const gp = Object.keys(dataeggnew).map((key) => dataeggnew[key]);
  //   const egggp = dataeggnew.map((item) => {
  //     return { latitude: item.latitude, longitude: item.longitude };
  //   });
  const egggp = Object.keys(dataeggnew)
    // .filter((key) => key.startsWith('marker_'))
    .map((key) => dataeggnew[key]);
  console.log('egggp!!!!!', egggp);
  return dataeggnew;
};

export const getMaggieEgg = async (zone) => {
  // console.log('I GOT HERE!!!!! GET MAGGIEEGG')
  const q = query(collection(db, 'eggs'), where('zone', '==', zone.id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log("BLAAAAAA", doc.id, ' =>', doc.data());
  });

  const data = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })

  return data
};
