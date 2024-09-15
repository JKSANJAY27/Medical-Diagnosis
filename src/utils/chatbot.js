// chatbot.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { query } = require('./dbConfig.jsx');

// Google Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyCh6KndgzWkddJp9STjb0EenxRdtR_zC38';
const GEMINI_API_URL = 'https://api.gemini.google.com/v1/query'; // Replace with the actual Gemini API URL

// Route to handle user messages
router.post('/ask', async (req, res) => {
  const { message } = req.body;
  
  // Prepare request payload for Google Gemini
  const requestPayload = {
    prompt: message,
    max_tokens: 150, // Adjust based on your needs
  };

  try {
    // Call Google Gemini API
    const response = await axios.post(GEMINI_API_URL, requestPayload, {
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Process and return the response
    const geminiResponse = response.data.choices[0].text.trim();
    
    res.json({ response: geminiResponse });
  } catch (error) {
    console.error('Error interacting with Google Gemini API:', error);
    res.status(500).json({ response: "Sorry, there was an error processing your request." });
  }
});

module.exports = router;
