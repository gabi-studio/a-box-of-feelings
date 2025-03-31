import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import analyzeWithWatson from './components/watson-api.js';
import getQuote from './components/quoteshub-api.js';
import getAffirmation from './components/emotiquote-api.js';
import getGradientColors from './components/colors-api.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8800;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  try {
    const emotionScores = await analyzeWithWatson(text);
    // console.log("Emotion scores:", emotionScores);
    const primaryEmotion = Object.entries(emotionScores).sort((a, b) => b[1] - a[1])[0][0];
    // console.log("Primary emotion:", primaryEmotion);
    const affirmation = await getAffirmation(primaryEmotion);
    // console.log("Affirmation:", affirmation);
    const quote = await getQuote(primaryEmotion);
    // console.log("Quote:", quote);
    const [color1, color2] = await getGradientColors(primaryEmotion);

    console.log("Colors:", color1, color2);
    res.render('index', {
      result: {
        primaryEmotion,
        quote,
        affirmation,
        color1,
        color2,
      }
    });
  } catch (err) {
    console.error(err);
    res.render('index', { result: { error: 'Error, please try again' } });
  }
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});