import fetch from 'node-fetch';

// API: https://emotiquote-api.onrender.com/api/quotes/emotion/{emotion}
// Sample request: https://emotiquote-api.onrender.com/api/quotes/emotion/joy
// Emotiquote API provides a list of affirmations based on the emotion
// the affirmations are categorized by emotions like joy, sadness, fear, anger, and disgust
// the emotions are based on Watson NLU 


// getAffirmation function takes an emotion and returns an affirmation based on the emotion
// If the fetch fails, it will return a default affirmation


async function getAffirmation(emotion) {
  try {
    const res = await fetch(`https://emotiquote-api.onrender.com/api/quotes/emotion/${emotion}`);
    const data = await res.json();

    // The API returns an array of objects (not an object with `quotes`)
    if (Array.isArray(data) && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const selected = data[randomIndex];

      // Extract the affirmation property from the object
      return selected.affirmation;
    } else {
      return "You are enough, you will always be enough, and you are capable of amazing things.";
    }

  } catch (err) {
    console.error("EmotiQuote API failed:", err);
    return "You are enough, you will always be enough, and you are capable of amazing things.";
  }
}



// export functions

export default getAffirmation;
