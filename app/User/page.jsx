"use client";
import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/fetchUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Navbar from "../components/navbar";

const UserPage = () => {
  // #region Database Variable(s)
  const [user, userLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState([]);
  // #endregion

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

      {userData.dishes && (
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
        </div>
      )}
    </>
  );
};

export default UserPage;
