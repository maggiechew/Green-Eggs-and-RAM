import { db } from '../config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const getIndividualUserRecord = async (id) => {
  const querySnapshot = await getDoc(doc(db, 'users', id));
  const eggdata = querySnapshot.data()?.eggs;
  // const data = object.keys(datanew);
  console.log('querySnapshot', querySnapshot.data());
  console.log('eggdata', eggdata);
  // console.log('data#####: ', data);

  if (querySnapshot.exists()) {
    console.log('Document data:', querySnapshot.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
  return querySnapshot.data();
};

//firebase.firestore().collection('sample').where('uid', '=', firebase.auth().currentUser.uid).get().then((querySnapshot) => { querySnapshot.forEach((doc) => { console.log(doc.id, ' => ', doc.data()); }); });

//get ( fieldPath :  string | FieldPath ,  options ? :  SnapshotOptions ) : any
//SnapshotOptions { serverTimestamps: 'estimate' | 'previous' | 'none' }

// get ( fieldPath: "eggs/", options?: SnapshotOptions ): any
