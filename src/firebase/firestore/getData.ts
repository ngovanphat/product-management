import { Product, productConverter } from "@/components/organism/ProductItem";
import firebase_app from "../config";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import addData from "./addData";

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
