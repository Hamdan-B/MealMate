"use client";

import { useEffect, useState } from "react";
import styles from "./AiDish.module.css";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateDishes } from "@/lib/firestoreOperations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

function AIDish() {
  let tempIngrName = "";

  const cuisineTypes = ["Any", "Pakistani", "Chineese", "Italian"];
  const noOfDishestoGenerate = ["Two", "Three", "Five"];

  // #region UseStates
  const [inputText, setInputText] = useState("");
  const [ingredientListInput, setIngredientListInput] = useState([]);
  const [dishCountry, setDishCountry] = useState("Any");
  const [noOfDishes, setNoOfDishes] = useState("Two");
  const [geminiResp, setGeminiResp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [userId, setUserId] = useState("");
  //#endregion

  // Other Var(s)
  const [user, userLoading, userError] = useAuthState(auth);

  const initRespPlaceHolder = (
    <>
      <div className={styles.placeHolder}>
        <div>
          <p>Your personalized recipe suggestions will appear here!</p>
        </div>

        <div className={styles.chefThinking}>
          <img src="/images/ChefThinking.png" alt="chefthinking" />
        </div>
      </div>
    </>
  );

  // Input Handling
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddIngredient = () => {
    if (inputText.trim() !== "") {
      setIngredientListInput([...ingredientListInput, inputText.trim()]);
      setInputText("");
    }
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = ingredientListInput.filter((_, i) => i !== index);
    setIngredientListInput(newIngredients);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };
  const handleDishCountryInput = (value) => {
    setDishCountry(value);
    console.log("changedContry");
  };
  const handleNoOfDishInput = (value) => {
    setNoOfDishes(value);
    console.log("changedNumber");
  };

  // Response Handling
  const respDetailHandler = (index) => {
    setSelectedDishIndex(index);
    setPopUpOpen(true);
  };

  // Save Dish Button Handler
  const saveDish = (dish) => {
    updateDishes(userId, dish);
  };

  // Set UserID on user change
  useEffect(() => {
    if (user) {
      const getData = async () => {
        setUserId(user.uid);
      };
      getData();
    }
  }, [user]);

  // API Calls
  async function GenerateDishFromAPI() {
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

  return (
    <>
      <div className={styles.cont}>
        <h1>Recipe Generater</h1>
        <div className={styles.geminiCont}>
          {/* INPUT STUFF */}
          <div className={styles.dishFinderInputCont}>
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
                      onValueChange={(value) => handleDishCountryInput(value)}
                    >
                      {cuisineTypes.map((cuisine) => (
                        <div key={cuisine}>
                          <RadioGroupItem
                            value={cuisine}
                            id={cuisine}
                            className={styles.radioGroupItem}
                          />
                          <Label
                            htmlFor={cuisine}
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
              {/* No of dishes to fetch */}
              <div>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <div>
                      <h2>Number of Dishes</h2>
                      <p>Select how many dishes to generate</p>
                    </div>
                    <RadioGroup
                      defaultValue="Two"
                      className={styles.radioGroup}
                      onValueChange={(value) => handleNoOfDishInput(value)}
                    >
                      {noOfDishestoGenerate.map((_noOfDish) => (
                        <div key={_noOfDish}>
                          <RadioGroupItem
                            value={_noOfDish}
                            id={_noOfDish}
                            className={styles.radioGroupItem}
                          />
                          <Label
                            htmlFor={_noOfDish}
                            className={
                              noOfDishes === _noOfDish
                                ? styles.radioGroupItemLabelChecked
                                : styles.radioGroupItemLabel
                            }
                          >
                            {_noOfDish}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Ingredient Input Stuff */}
            <Card className={styles.IngredientCard}>
              <CardContent className={styles.IngredientCardContent}>
                <div className={styles.IngredientCardContentInput}>
                  <Input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter ingredient name"
                    aria-label="Ingredient name"
                  />
                  <Button onClick={handleAddIngredient} size="lg">
                    Add
                  </Button>
                </div>

                <div className={styles.IngredientCardContentOutput}>
                  <h3>Your Ingredients</h3>
                  <div>
                    {ingredientListInput.map((ingredient, index) => (
                      <div
                        key={index}
                        className={styles.IngredientCardContentOutputList}
                      >
                        <span>{ingredient}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteIngredient(index)}
                          aria-label={`Delete ingredient: ${ingredient}`}
                          className={styles.deleteBtn}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Recipes btn */}
            <div className={styles.ButtonCont}>
              <button onClick={GenerateDishFromAPI}>Generate Recipes</button>
              {/* Temp sample input btn */}
              {/* <button
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
                  GenerateDishFromAPI();
                }}
              >
                Sample
              </button> */}
            </div>
          </div>
          {/* REPSONSE DISPLAY */}
          <div className={styles.dishFinderRespCont}>
            {loading && (
              <div className={styles.loaderCont}>
                <div className={styles.loader}></div>
              </div>
            )}
            {!loading && (
              <>
                {geminiResp.error && <li>{geminiResp.error}</li>}

                {geminiResp.length === 0 ? (
                  <>{initRespPlaceHolder}</>
                ) : (
                  <>
                    {!geminiResp.error && (
                      <>
                        <div className={styles.responseCont}>
                          <h2>Suggested Dishes</h2>
                          {geminiResp.map((dish, index) => (
                            <Card
                              key={index}
                              className={styles.dishFinderRespContCard}
                            >
                              <CardContent
                                className={styles.dishFinderRespContCardContent}
                              >
                                <div>
                                  <h3>{dish["dishName"]}</h3>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      respDetailHandler(index);
                                    }}
                                  >
                                    Details
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
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
              {/* Close & Save buttons */}
              <button
                onClick={() => {
                  setPopUpOpen(false);
                }}
              >
                Close
              </button>
              {user && (
                <button
                  onClick={() => {
                    saveDish(geminiResp[selectedDishIndex]);
                  }}
                >
                  Save
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AIDish;
