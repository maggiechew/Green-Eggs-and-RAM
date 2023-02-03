import { getDoc, doc } from 'firebase/firestore';

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
