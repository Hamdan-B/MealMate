"use client";
import React, { useState, useEffect } from "react";
import styles from "./Schedular.module.css";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateSchedule } from "@/lib/firestoreOperations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

const Schedular = () => {
  const [noOfDays, setNoOfDays] = useState("Three");
  const [dishCountry, setDishCountry] = useState("Any");
  const [scheduleData, setScheduleData] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [userId, setUserId] = useState("");

  //Other Var(s)
  const [user, userLoading, userError] = useAuthState(auth);
  const cuisineTypes = ["Any", "Pakistani", "Chineese", "Italian"];
  const noOfDaystoGenerate = ["Three", "Five", "Seven"];

  // Handle Country Change Input
  const dishCountryChange = (value) => {
    setDishCountry(value);
  };
  const handleNoOfDaysInput = (value) => {
    setNoOfDays(value);
    console.log("changedNumber");
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
      <div className={styles.schedulerCont}>
        <h1 style={{ color: "white" }}>Schedule Generater</h1>
        <div className={styles.cont}>
          {/* INPUT STUFF */}
          <div className={styles.optionsCont}>
            {/* DishCountry Radio */}
            <div>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <div>
                    <h2>Select Cuisine Type</h2>
                    <p>Choose your preferred cuisine style</p>
                  </div>
                  <RadioGroup
                    defaultValue="any"
                    className={styles.radioGroup}
                    onValueChange={(value) => dishCountryChange(value)}
                  >
                    {cuisineTypes.map((cuisine) => (
                      <div key={cuisine + "1"}>
                        <RadioGroupItem
                          value={cuisine}
                          id={cuisine + "1"}
                          className={styles.radioGroupItem}
                        />
                        <Label
                          htmlFor={cuisine + "1"}
                          className={
                            dishCountry === cuisine
                              ? styles.radioGroupItemLabelChecked
                              : styles.radioGroupItemLabel
                          }
                        >
                          {cuisine}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
            {/* No of Days */}
            <div>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <div>
                    <h2>Number of Days</h2>
                    <p>Select how many days to generate meals for</p>
                  </div>
                  <RadioGroup
                    defaultValue="Three"
                    className={styles.radioGroup}
                    onValueChange={(value) => handleNoOfDaysInput(value)}
                  >
                    {noOfDaystoGenerate.map((_noOfDays) => (
                      <div key={_noOfDays + "1"}>
                        <RadioGroupItem
                          value={_noOfDays}
                          id={_noOfDays + "1"}
                          className={styles.radioGroupItem}
                        />
                        <Label
                          htmlFor={_noOfDays + "1"}
                          className={
                            noOfDays === _noOfDays
                              ? styles.radioGroupItemLabelChecked
                              : styles.radioGroupItemLabel
                          }
                        >
                          {_noOfDays}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Generate Schedule Btn */}
          <button
            className={styles.generateBtn}
            onClick={generateScheduleFromAPI}
          >
            Generate Schedule!
          </button>
        </div>
      </div>

      {dataLoading && <p>Loading....</p>}

      {/* POPUP */}
      {popUp && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h1>Will be coded Soon!</h1>
            <pre>{JSON.stringify(scheduleData["meals"])}</pre>
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
