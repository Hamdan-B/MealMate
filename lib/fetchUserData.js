import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

//Fetching User Data From Firestore
export async function fetchUserData(documentID) {
  const docRef = doc(db, "users", documentID);
  const docSnap = await getDoc(docRef);

  console.log("User Data Fetched: ", docSnap.data());
  return docSnap.data();
}
