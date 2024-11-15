import axios from "axios";

export async function POST(req) {
  console.log("POST req recieved");
  const { noOfDays, dishCountry } = await req.json();

  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCSN16glxT4HA1n0N592f_pMqkmvnG4a5w`,
      method: "POST",
      data: {
        contents: [
          {
            parts: [
              {
                text: `Make a Meal schedule of ${noOfDays} days (Three Meals for each day) and also a small descrition on why this Meal Schedule, the meals should be Halal and of ${dishCountry} country using this JSON schema:
                "Meals": [[
                {"mealTime": "breakfast", 'dishName': string, 'dishCountry':string, 'dishIngredients': stringList, 'dishRecipe':stringList, 'dishDescription': string},
                {"mealTime": "lunch", 'dishName': string, 'dishCountry':string, 'dishIngredients': stringList, 'dishRecipe':stringList, 'dishDescription': string},
                {"mealTime": "dinner", 'dishName': string, 'dishCountry':string, 'dishIngredients': stringList, 'dishRecipe':stringList, 'dishDescription': string}
            ],
        // ... (similar structure for remaining days)
    ],

Return: {'meals': Meals, 'scheduleDescription': string}
and if by any means you can't provide the dishes or the answer in the specified JSON format, just give an error using this JSON schema:
Error = {'error':string}
Return: Error`,
              },
            ],
          },
        ],
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch dishes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
