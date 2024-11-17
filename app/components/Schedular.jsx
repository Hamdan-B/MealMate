"use client";
import React, { useState, useEffect } from "react";
import styles from "./Schedular.module.css";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateSchedule } from "@/lib/firestoreOperations";

const Schedular = () => {
  const [noOfDays, setNoOfDays] = useState(3);
  const [dishCountry, setDishCountry] = useState("Any");
  const [scheduleData, setScheduleData] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [userId, setUserId] = useState("");

  //Other Var(s)
  const [user, userLoading, userError] = useAuthState(auth);

  // Handle Country Change Input
  const dishCountryChange = (event) => {
    const value = event.target.value;
    setDishCountry(value);
  };

  // Save Btn Func
  const SaveBtn = () => {
    updateSchedule(userId, scheduleData);
  };

  useEffect(() => {
    if (user) {
      const getData = async () => {
        setUserId(user.uid);
      };
      getData();
    }
  }, [user]);

  // API Calls
  async function generateScheduleFromAPI() {
    setDataLoading(true);

    const response = await fetch("/api/ai/fetchschedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noOfDays: noOfDays,
        dishCountry: dishCountry,
      }),
    });

    const result = await response.json();

    let _resp = result["candidates"][0]["content"]["parts"][0]["text"].replace(
      /```json|```/g,
      ""
    );

    _resp = JSON.parse(_resp);

    console.log(_resp);

    setScheduleData(_resp);
    setDataLoading(false);
    setPopUp(true);
  }

  return (
    <>
      {/* INPUT STUFF */}
      <div>
        {/* DishCountry Radio */}
        <div>
          <h3>Cuisine</h3>
          <label>
            <input
              type="radio"
              value="Any"
              checked={dishCountry === "Any"}
              onChange={dishCountryChange}
            />
            Any
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Pakistani"
              checked={dishCountry === "Pakistani"}
              onChange={dishCountryChange}
            />
            Pakistani
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Chineese"
              checked={dishCountry === "Chineese"}
              onChange={dishCountryChange}
            />
            Chineese
          </label>
        </div>
        {/* No of Days */}
        <div>
          <h3>Days</h3>
          <select
            value={noOfDays}
            onChange={(e) => {
              setNoOfDays(e.target.value);
            }}
          >
            <option value={3}>Three</option>
            <option value={5}>Five</option>
            <option value={7}>Seven</option>
          </select>
        </div>
      </div>
      {/* Generate Schedule Btn */}
      <button onClick={generateScheduleFromAPI}>Generate Schedule!</button>

      {dataLoading && <p>Loading....</p>}

      {/* POPUP */}
      {popUp && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h1>Something</h1>
            {/* Close & Save Btn */}
            <button
              onClick={() => {
                setPopUp(false);
              }}
            >
              Close
            </button>
            {user && (
              <button
                onClick={() => {
                  SaveBtn();
                }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Schedular;
