import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getMovieSuggestion = async (mood) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest only ONE popular movie name for this mood: "${mood}". 
Return ONLY the movie title. Do not add explanation or extra text.`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};