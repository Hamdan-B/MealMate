"use client";
import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/fetchUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Navbar from "../components/navbar";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const [user, userLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState([]);

  const router = useRouter();

  //Signout User
  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  useEffect(() => {
    if (user) {
      const getData = async () => {
        const result = await fetchUserData(user.uid);
        setUserData(result);
      };
      getData();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      {/* User Profile */}
      {userLoading && <p>Getting your info</p>}

      {userData.error && <p>{userData.error}</p>}

      {!userData.error && userData.dishes && (
        <div>
          <h1>{userData.firstName}</h1>
          <h1>{userData.lastName}</h1>
          <ul>
            {userData.dishes.map((dish) => (
              <li key={dish.dishName}>
                <pre>{JSON.stringify(dish)}</pre>
              </li>
            ))}
          </ul>
          <pre>{JSON.stringify(userData.schedule.meals)}</pre>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default UserPage;
