# A Box of Feelings

is a web app that analyzes how you're feeling based on your written thoughts, then offers an inspirational quote and an affirmation tailored to your emotion, to guide your day.

Deployed at: [https://a-box-of-feelings.onrender.com](https://a-box-of-feelings.onrender.com)

> [!NOTE]
> The [EmotiQuote API](https://emotiquote-api.onrender.com/) this app is using is deployed on free render and may need to be loaded for the app to receive not just the default affirmation.

### Features

- Analyze journal-style text using IBM Watson Natural Language Understanding API
- Detect primary emotion (joy, sadness, fear, anger, or disgust)
- Retrieve a matching affirmation using the EmotiQuote API
- Retrieve an inspirational quote using the QuotesHub API
- Background colour changes based on the emotion detected using CSS Colors API

### APIs used

- [IBM Watson NLU API](https://cloud.ibm.com/apidocs/natural-language-understanding)
- [EmotiQuote API](https://emotiquote-api.onrender.com/)
- [The Quotes Hub API](https://thequoteshub.com/)
- [CSS Colors API](https://www.csscolorsapi.com/)

### Tech Stack

- Node.js
- Express
- Pug
- Vanilla CSS and JavaScript




