import firebase_app from "../config";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
  OrderByDirection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function getData(collectionName: string) {
  let result = null;
  let error = null;

  try {
    result = await getDocs(collection(db, collectionName));
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDataRecord(
  collectionName: string,
  recordName: string
) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collectionName, recordName);
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDataWithQuery(
  collectionName: string,
  filter: { fieldName: string; order: OrderByDirection; limit: number }
) {
  let result = null;
  let error = null;

  try {
    const dbRef = collection(db, collectionName);
    const q = query(
      dbRef,
      orderBy(filter.fieldName, filter.order),
      limit(filter.limit)
    );
    result = await getDocs(q);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
