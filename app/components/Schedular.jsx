"use client";
import React, { useState } from "react";

const Schedular = () => {
  const [noOfDays, setNoOfDays] = useState(3);
  const [dishCountry, setDishCountry] = useState("Any");
  const [scheduleData, setScheduleData] = useState();
  const [dataLoading, setDataLoading] = useState(false);

  // #region API Calls (Async Functions)
  async function geminiSearch() {
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
  }
  // #endregion

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setDishCountry(value);
  };
  return (
    <>
      <div>
        {/* DishCountry Radio */}
        <div>
          <h3>Cuisine</h3>
          <label>
            <input
              type="radio"
              value="Any"
              checked={dishCountry === "Any"}
              onChange={handleTypeChange}
            />
            Any
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Pakistani"
              checked={dishCountry === "Pakistani"}
              onChange={handleTypeChange}
            />
            Pakistani
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Chineese"
              checked={dishCountry === "Chineese"}
              onChange={handleTypeChange}
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
      <button onClick={geminiSearch}>Generate Schedule!</button>
      {dataLoading ? (
        <p>Loading....</p>
      ) : (
        <pre>{JSON.stringify(scheduleData)}</pre>
      )}
    </>
  );
};

export default Schedular;
