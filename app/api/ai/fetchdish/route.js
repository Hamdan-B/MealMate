import axios from "axios";

//POST request to gemeini (to generate dishes)
export async function POST(req) {
  const { noOfDishes, ingredientListInput, dishCountry } = await req.json();

  console.log("POST req recieved");

  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCSN16glxT4HA1n0N592f_pMqkmvnG4a5w`,
      method: "POST",
      data: {
        contents: [
          {
            parts: [
              {
                text: `List ${noOfDishes} dishes and its recipes based on these ingredients ${ingredientListInput} and the dishes should be Halal and of '${dishCountry}' country dishes, using this JSON schema:
                Recipe = {'dishName': string, 'dishDescription': string, 'dishCountry':string, 'dishIngredients': stringList, 'dishRecipe':stringList}
                Return: Array<Recipe>
                and if by any means you can't provide the dishes or the answer in the specified JSON format, just give an error using this JSON schema:
                Error = {'error':string}
                Return: Error`,
              },
            ],
          },
        ],
      },
    });
    console.log("sent request");

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
