import express from 'express';
import analyzeWithWatson from '../components/watson-api.js';
import getQuote from '../components/quoteshub-api.js';
import getAffirmation from '../components/emotiquote-api.js';
import getGradientColors from '../components/colors-api.js';

const analyzeRouter = express.Router();

// POST /api/analyze
// Analyze the text in the request body using Watson NLU
// and return the primary emotion, emotion scores, a quote, and an affirmation
// the quote is from the quotable API and fetched using keywords based on the primary emotion
// the affirmation is from the Emotiquote API and fetched using the primary emotion

analyzeRouter.post('/', async (req, res) => {
  const { text } = req.body;

  try {
    const emotionScores = await analyzeWithWatson(text);
    // sort the emotion scores in descending order and the first element is the primary emotion
    const primaryEmotion = Object.entries(emotionScores).sort((a, b) => b[1] - a[1])[0][0];
    const quote = await getQuote(primaryEmotion);
    const affirmation = await getAffirmation(primaryEmotion);
    const [color1, color2] = await getGradientColors(primaryEmotion);

    res.json({
      primaryEmotion,
      emotionScores,
      quote,
      affirmation,
      color1,
      color2
    });
  } catch (err) {
    console.error("Analysis failed:", err);
    res.status(500).json({ error: "Failed to analyze text." });
  }
});

export default analyzeRouter;
