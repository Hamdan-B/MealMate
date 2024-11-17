import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

//Fetching User Data From Firestore
export async function fetchUserData(documentID) {
  try {
    const docRef = doc(db, "users", documentID);
    const docSnap = await getDoc(docRef);

    console.log("User Data Fetched: ", docSnap.data());
    return docSnap.data();
  } catch (err) {
    console.log("Error Fetching User Data From Firestore");
    return { error: "Error Fetching User Data From Firestore" };
  }
}
