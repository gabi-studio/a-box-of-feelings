import dotenv from 'dotenv';
dotenv.config();

// https://cloud.ibm.com/apidocs/natural-language-understanding
// Watson NLU API provides a list of emotions based on the text input


import { IamAuthenticator } from 'ibm-watson/auth/index.js';
import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1.js';


// Create a new instance of the NaturalLanguageUnderstandingV1 service
// with the API key and URL from the environment variables
const nlu = new NaturalLanguageUnderstandingV1({
  version: '2022-04-07',
  authenticator: new IamAuthenticator({ apikey: process.env.WATSON_API_KEY }),
  serviceUrl: process.env.WATSON_URL
});

async function analyzeWithWatson(text) {
  const response = await nlu.analyze({
    text,
    features: { emotion: { document: true } }
  });

  // console.log("Your text:", text);


  // return the emotion and the original text and the emotion scores

  // return {
  //   emotion: response.result.emotion.document.emotion,
  //   text
    

  // };
  

  return response.result.emotion.document.emotion; 

  

  console.log("Watson result:", response.result.emotion.document.emotion);
  
} 

// export the analyzeWithWatson function
export default analyzeWithWatson;