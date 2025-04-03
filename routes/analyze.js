import express from 'express';
import analyzeWithWatson from '../components/watson-api.js';
import getQuote from '../components/quoteshub-api.js';
import getAffirmation from '../components/emotiquote-api.js';
import getGradientColors from '../components/colors-api.js';

const analyzeRouter = express.Router();

// POST /api/analyze
// Accepts a text input from the request body
// 1. Analyzes the text using IBM Watson NLU to extract emotion scores
// 2. Identifies the primary emotion (highest score)
// 3. Fetches a related quote from the Quotable API using emotion-based tags
// 4. Fetches a related affirmation from the EmotiQuote API using the primary emotion
// 5. Fetches two pastel background colors based on the primary emotion from the CSS Colors API
// Returns: submitted text, primary emotion, emotion scores, quote, affirmation, and background colors

analyzeRouter.post('/', async (req, res) => {
  const { text } = req.body;

  // validate input
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text input is required.' });
  }

  try {
    // analyze the emotion scores using Watson
    const emotionScores = await analyzeWithWatson(text);

    // we want the emotion with the highest score
    // sort the emotion scores in descending order
    // and the first element is the primary emotion
    const primaryEmotion = Object.entries(emotionScores)
      .sort((a, b) => b[1] - a[1])[0][0];

    // get quote and affirmation matching the primary emotion
    const quote = await getQuote(primaryEmotion);
    const affirmation = await getAffirmation(primaryEmotion);

    // get pastel gradient colors for the primary emotion
    const [color1, color2] = await getGradientColors(primaryEmotion);

    // send the response with all the data
    res.render('index', {
      result: {
        primaryEmotion,
        emotionScores,
        quote,
        affirmation,
        color1,
        color2
      },
      submittedText: text 
    });

  } catch (err) {
    console.error("Analysis failed:", err);
    res.status(500).json({ error: "Failed to analyze text. Please try again." });
  }
});

export default analyzeRouter;
