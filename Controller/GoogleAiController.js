require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are a Tour Planner AI. Return only a JSON array of tourist places for the given 7 to 10 location. Each place must have: name, a valid reference image URL (find a relevant image), and an estimated cost. Return only valid JSON. Do not include explanations or extra text.",
});


async function getUnsplashImage(placeName) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.error("Unsplash Access Key is missing in environment variables.");
    return null;
  }

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: placeName,
        per_page: 1,
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    const imageUrl = response.data.results[0]?.urls?.regular || null;
    if (!imageUrl) {
      console.warn(`No Unsplash image found for "${placeName}"`);
    }
    return imageUrl;
  } catch (error) {
    console.error(`Unsplash error for "${placeName}":`, error.response?.data || error.message);
    return null;
  }
}


// Main API controller
module.exports.getGoogleAiResponse = async (req, res) => {
  const place = req.query.place;
  const days = req.query.days || 1;

  if (!place) {
    return res.status(400).json({ error: "Place is required" });
  }

  const prompt = `Plan a ${days}-day tour for ${place}. Return only a JSON array of tourist places to visit in ${place} for ${days} day(s), with each place having name, a valid image URL, and estimated cost.`;

  try {
    const result = await model.generateContent(prompt);
    const rawText = result?.response?.text() || "";

    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    let parsedJSON;

    try {
      parsedJSON = JSON.parse(cleanedText);

      // Replace image URLs with Unsplash images
      const placesWithImages = await Promise.all(
        parsedJSON.map(async (place) => {
          const unsplashImage = await getUnsplashImage(place.name);
          return {
            ...place,
            image: unsplashImage || null,
          };
        })
      );

      res.status(200).json({ place, days, places: placesWithImages });
    } catch (err) {
      console.error("Error parsing JSON from Gemini response:", err);
      return res.status(500).json({
        error: "Failed to parse response into JSON. Check AI formatting.",
        raw: rawText,
      });
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
