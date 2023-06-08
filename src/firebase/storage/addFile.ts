import firebase_app from "../config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebase_app);

export default async function addFile(file: any, fileName: string) {
  let result = null;
  let error = null;

  try {
    const { ref: uploadRef } = await uploadBytes(ref(storage, fileName), file);
    result = await getDownloadURL(uploadRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
