/*    TODO    */
// Setup Input for dishCountry (Dish Country)
// Setup Input for noOfDishes_g (No of dishes AI will produce)

import { useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const noOfDishes_g = 4;

  const [ingredientListInput, setIngredientListInput] = useState([]);
  const [dishCountry, setDishCountry] = useState("any");
  const [geminiResp, setGeminiResp] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function apiNinja() {
    const resp = await axios({
      url:
        "https://api.api-ninjas.com/v1/recipe?ingredientListInput=" + "karahi",
      method: "get",
      headers: { "X-Api-Key": "H9YaMXDoUvko1uWN5n4Umw==3bpxqsYX01P0rH9H" },
    });
    console.log(resp);
  }

  async function geminiSearch() {
    setLoading(true);
    const resp = await axios({
      //API_KEY = AIzaSyCSN16glxT4HA1n0N592f_pMqkmvnG4a5w
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCSN16glxT4HA1n0N592f_pMqkmvnG4a5w",
      method: "POST",
      data: {
        contents: [
          {
            parts: [
              {
                text: `List ${noOfDishes_g} dishes and it's recipes based on these ingredients ${ingredientListInput} and the dishes should be '${dishCountry}' country dishes, using this JSON schema:

Recipe = {'dishName': string, 'dishDescription': string, 'dishCountry':string, 'dishIngredients': stringList, 'dishRecipe':string}
Return: Array<Recipe>

and if by any mean you can't provide the dishes or the answer in the specified JSON format just give an error using this JSON schema:

Error = {'error':string}
Return: Error`,
              },
            ],
          },
        ],
      },
    });

    let _resp = resp["data"]["candidates"][0]["content"]["parts"][0][
      "text"
    ].replace(/```json|```/g, "");

    _resp = JSON.parse(_resp);

    console.log(_resp);

    setGeminiResp("Check Console For Response");
    setLoading(false);
  }

  return (
    <>
      <div className="navbar">
        <h1 className="logo">MealMate</h1>
        <ul>
          <li>Home</li>
          <li>Schedular</li>
          <li>Other</li>
          <li>Other</li>
        </ul>
      </div>

      <div className="cont">
        <div className="apiNinjaCont">
          <button onClick={apiNinja}>API_Ninja Recipies</button>
        </div>
        <div className="geminiCont">
          {/* 
          Input as plain text
          <textarea
            value={ingredientListInput}
            placeholder="['ingr 1', 'ingr2', 'ingr3', ...]"
            cols={30}
            rows={10}
            onChange={(e) => {
              setIngredientListInput(e.target.value);
            }}
          ></textarea> */}

          {/* If Ingredient list is empty */}
          {ingredientListInput.length == 0 && (
            <p>Add items by typing each name in the input box.</p>
          )}
          {/* If Ingredient list is NOT empty */}
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
                setIngredientListInput((ingredientListInput) => [
                  ...ingredientListInput,
                  tempIngrName,
                ]);
              }}
            >
              Add
            </button>
          </div>

          {/* DishCountry Radio */}
          <div>
            <input type="radio" id="any" name="dishCountry" value="Any" />
            <label htmlFor="any">Any</label>
            <br />
            <input type="radio" id="pak" name="dishCountry" value="Pakistani" />
            <label htmlFor="pak">Pakistani</label>
            <br />
            <input type="radio" id="ind" name="dishCountry" value="Indian" />
            <label htmlFor="ind">Indian</label>
            <br />
            <input type="radio" id="tur" name="dishCountry" value="Turkish" />
            <label htmlFor="tur">Turkish</label>
          </div>

          {/* Gemeni Search Button */}
          <button onClick={geminiSearch}>Gemini Recipies</button>

          <button
            onClick={() => {
              setIngredientListInput(sampleIngredients);
            }}
          >
            Sample Input
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && <p>{geminiResp}</p>}
    </>
  );
}

export default App;
