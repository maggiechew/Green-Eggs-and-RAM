import {
  collection, getCountFromServer
} from 'firebase/firestore';
import { db } from '../config';

export const eggTotalFetch = async() => {

const coll = collection(db, "eggs");
const snapshot = await getCountFromServer(coll);
return snapshot.data().count
}