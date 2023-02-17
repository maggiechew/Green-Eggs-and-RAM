import {
  getDoc,
  doc,
  getDocs,
  getCountFromServer,
  query,
  where,
  collection
} from 'firebase/firestore';
import { db } from '../config';

export const eggTotalFetch = async() => {

const coll = collection(db, "eggs");
const snapshot = await getCountFromServer(coll);
return snapshot.data().count
}