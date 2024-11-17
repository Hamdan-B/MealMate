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

//Change User's 'Schedule' field
export async function updateSchedule(userId, scheduleData) {
  try {
    await updateDoc(doc(db, "users", userId), {
      schedule: scheduleData,
    });
    console.log("Schedule Updated!");
  } catch (error) {
    console.error("Error updating schedule:", error);
  }
}
