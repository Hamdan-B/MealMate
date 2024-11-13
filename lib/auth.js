import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "././firebase";
import { doc, setDoc } from "firebase/firestore";

// New User Registration
export async function registerUser(email, password, firstName, lastName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    //Storing Additional Data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      dishes: [],
    });

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// User Login
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error("Error Signing in user:", error);
    throw error;
  }
}
