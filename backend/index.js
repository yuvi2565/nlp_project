// index.js
const { ComprehendMedicalClient, DetectEntitiesCommand } = require("@aws-sdk/client-comprehendmedical");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const genAI = new GoogleGenerativeAI("AIzaSyC4-kG725OmnR88PW7Umz7PSTsOu3HZXKk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post("/submit-text",  async (req, res) => {

  const { text } = req.body;
  const prompt = "Summarize the following GDPR article and extract consent requirements, withdrawal rights, and processing restrictions: " + text;
  
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  console.log(response)

  res.json({ text:response });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
