import { getDoc, doc } from 'firebase/firestore';

export const getPolygon = async (db, id) => {
  const querySnapshot = await getDoc(doc(db, 'zone', id));
  const datanew = querySnapshot.data()?.geopoints;
  console.log('querySnapshot', querySnapshot.data());
  console.log('datanew', datanew);
  const data = datanew.map((item) => {
    return { latitude: item.latitude, longitude: item.longitude };
  });
  console.log('data====', data);
  const gp = Object.keys(data)
    // .filter((key) => key.startsWith('geo_'))
    .map((key) => data[key]);
  console.log('gp!!!!!', gp);
  return gp;
};
