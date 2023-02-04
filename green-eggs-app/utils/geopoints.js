import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config';

export const zonesFromDB = async () => {
  const querySnapshot = await getDocs(collection(db, 'zone'));
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, ' => ', doc.data()?.geopoints);
  // });
  const zones = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
  // console.log('zones!!!!', zones);
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
  // console.log('data!!!!', data);
  return data;
};

// const querySnapshot = await getDocs(collection(db, 'zone'));

// const zones = querySnapshot.docs.map((doc) => {
//   return {
//     id: doc.id,
//     ...doc.data()
//   };
// });
// console.log('zones!!!!', zones);
// const data = zones.map((item) => {
//   return {
//     id: item.id,
//     geopoints: item.geopoints.map((item) => {
//       return {
//         latitude: item.latitude,
//         longitude: item.longitude
//       };
//     })
//   };
// });
// console.log('data!!!!', data);
// return data;

//   });

// };

//   const querySnapshot = await getDoc(doc(db, 'zone', id));
//   console.log('querySnapshot', querySnapshot.data());
//   const data = querySnapshot.data();
//   const gp = Object.keys(data)
//     .map((key) => data[key]);
//   console.log('gp!!!!!', gp);

//   return gp;
