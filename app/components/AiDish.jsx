"use client";

import { useEffect, useState } from "react";
import styles from "./AiDish.module.css";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateDishes } from "@/lib/updateDishes";

function AIDish() {
  // #region UseStates
  const [ingredientListInput, setIngredientListInput] = useState([]);
  const [dishCountry, setDishCountry] = useState("Any");
  const [noOfDishes, setNoOfDishes] = useState(2);
  const [geminiResp, setGeminiResp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [userId, setUserId] = useState("");
  //#endregion

  // #region Basic Var(s)
  let tempIngrName = "";

  const sampleIngredients = [
    "beef shank",
    "oil",
    "garnish",
    "ground spices",
    "ginger",
    "garlic",
    "ghee",
    "salt",
    "onion",
    "star anise cinnamon bay leaf",
    "flour",
  ];

  // #endregion

  // #region Firebase Var(s)
  const [user, userLoading, userError] = useAuthState(auth);
  // #endregion

  useEffect(() => {
    if (user) {
      const getData = async () => {
        setUserId(user.uid);
      };
      getData();
    }
  }, [user]);

  // #region API Calls (Async Functions)

  async function geminiSearch() {
    setLoading(true);

    const response = await fetch("/api/ai/fetchdish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noOfDishes: noOfDishes,
        ingredientListInput: ingredientListInput,
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

    setGeminiResp(_resp);
    setLoading(false);
  }
  // #endregion

  // #region Input Handling Functions
  const handleTypeChange = (event) => {
    const value = event.target.value;
    setDishCountry(value);
  };
  // #endregion

  // #region Response Handling Function
  function respDetailHandler(index) {
    setSelectedDishIndex(index);
    setPopUpOpen(true);
  }
  // #endregion

  // #region Database Handling Function
  function saveDish(dish) {
    updateDishes(userId, dish);
  }

  // #endregion

  return (
    <>
      <div className={styles.cont}>
        <div className={styles.geminiCont}>
          {/* INPUT STUFF */}
          <div className={styles.dishFinderInputCont}>
            {ingredientListInput.length == 0 && (
              <p>Add items by typing each name in the input box below.</p>
            )}
            {ingredientListInput.length > 0 && (
              <p>{ingredientListInput.join(",")}</p>
            )}
            {/* Add Input/Button */}
            <div>
              <input
                type="text"
                name="ingrName"
                onChange={(e) => {
                  tempIngrName = e.target.value;
                }}
              />
              <button
                onClick={() => {
                  if (!ingredientListInput.includes(tempIngrName)) {
                    setIngredientListInput((ingredientListInput) => [
                      ...ingredientListInput,
                      tempIngrName,
                    ]);
                  }
                }}
              >
                Add
              </button>
              <div className={styles.imageCont}></div>
            </div>

            {/* Additional Options Input */}
            <div className={styles.optionsCont}>
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
              {/* No of dishes to fetch */}
              <div>
                <h3>No. of dishes</h3>
                <select
                  value={noOfDishes}
                  onChange={(e) => {
                    setNoOfDishes(e.target.value);
                  }}
                >
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                  <option value={5}>Five</option>
                </select>
              </div>
            </div>

            {/* Gemeni Search Button */}
            <button onClick={geminiSearch}>Gemini Recipies</button>
            <button
              onClick={() => {
                setIngredientListInput([
                  "beef shank",
                  "oil",
                  "garnish",
                  "ground spices",
                  "ginger",
                  "garlic",
                  "ghee",
                  "salt",
                  "onion",
                  "star anise cinnamon bay leaf",
                  "flour",
                ]);
                geminiSearch();
              }}
            >
              Sample
            </button>
          </div>
          {/* REPSONSE DISPLAY */}
          <div className={styles.dishFinderRespCont}>
            <h3>Dishes:</h3>
            {loading && <div className={styles.loader}></div>}
            {!loading && (
              <ul>
                {geminiResp.map((_dish, index) => (
                  <li key={index}>
                    <h4>{_dish["dishName"]}</h4>
                    <button
                      onClick={() => {
                        respDetailHandler(index);
                      }}
                    >
                      Details
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Popup component */}
      {popUpOpen && (
        <div className={styles.popupOverlay}>
          {!loading && (
            <div className={styles.popupContent}>
              <h2>{geminiResp[selectedDishIndex]["dishName"]}</h2>
              <div className={styles.popupDishDetailCont}>
                <p>{geminiResp[selectedDishIndex]["dishDescription"]}</p>
                <div className={styles.popupIngredients}>
                  <h4>Ingredients</h4>
                  <p>
                    {geminiResp[selectedDishIndex]["dishIngredients"].join(",")}
                  </p>
                  {/* <ul>
                      {geminiResp[selectedDishIndex]["dishIngredients"].map(
                        (_ingred) => (
                          <li key={_ingred}>{_ingred}</li>
                        )
                      )}
                    </ul> */}
                </div>
                <div className={styles.popupRecipe}>
                  <h4>Recipe</h4>
                  <ul>
                    {geminiResp[selectedDishIndex]["dishRecipe"].map(
                      (_ingred) => (
                        <li key={_ingred}>{_ingred}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => {
                  setPopUpOpen(false);
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  saveDish(geminiResp[selectedDishIndex]);
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AIDish;
