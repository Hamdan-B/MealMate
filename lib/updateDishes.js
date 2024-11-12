import { db } from "././firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

//Update User's 'dishes' field
export async function updateDishes(userId, dish) {
  try {
    await updateDoc(doc(db, "users", userId), {
      dishes: arrayUnion(dish),
    });
    console.log("Dish added successfully");
  } catch (error) {
    console.error("Error adding dish:", error);
  }
}
