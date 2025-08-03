console.log("HF TOKEN:", import.meta.env.VITE_HF_ACCESS_TOKEN);

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredrient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page
`;



export async function getRecipeFromChefClaude(ingredients) {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2", 
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Ingredients: ${ingredients.join(", ")}` },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return "⚠️ Sorry, I couldn't generate a recipe. Please try again later.";
  }
}

export async function getRecipeFromMistral(ingredients) {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Ingredients: ${ingredients.join(", ")}` },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching recipe from Mistral:", error);
    return "⚠️ Sorry, I couldn't generate a recipe from Mistral.";
  }
}

