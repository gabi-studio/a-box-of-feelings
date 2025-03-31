import fetch from 'node-fetch';

// API: https://thequoteshub.com/api/tags/{tag}
// sample request: https://thequoteshub.com/api/tags/happiness
// QuotesHub API provides a list of quotes based on the tag


// map NLU emotions to tags that are likely to return relevant quotes for that emotion
const quotesHubTagsByEmotion = {
  joy: ["happiness", "inspirational", "love", "hope"],
  sadness: ["sadness", "hope", "wisdom", "inspirational" ],
  fear: ["fear", "courage", "overcoming", "strength", "anxiety", "adversity"],
  anger: ["anger", "forgiveness", "peace", "understanding"],
  disgust: ["wisdom", "understanding", "forgiveness"]
};


// getQuote function takes an emotion and returns a quote based on the emotion
// "inspirational" is the fallback tag if all tags fail
// If all tags fail, it will return a fallback quote


async function getQuote(emotion) {
  
  const tagList = quotesHubTagsByEmotion[emotion] || ["inspirational"];

  for (const tag of tagList) {
    try {
      const res = await fetch(`https://thequoteshub.com/api/tags/${tag}`);
      const data = await res.json();

      console.log(`Quote API response for tag "${tag}":`, data);

      if (Array.isArray(data.quotes) && data.quotes.length > 0) {
        // Select a random quote from the array of quotes
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const selectedQuote = data.quotes[randomIndex];
        return `${selectedQuote.text} — ${selectedQuote.author}`; 
        
      }
    } catch (err) {
      console.error(`Failed to fetch quote for tag "${tag}":`, err.message);
    }
  }

  return "Keep your face always toward the sunshine, and shadows will fall behind you. — Walt Whitman";
}



// export functions
export default getQuote;
