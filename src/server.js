// src/server.js

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const db = require('./db');
const path = require('path');
const franc = require('franc');
const { Configuration, OpenAIApi } = require('openai');
const rateLimit = require('express-rate-limit');
const sanitizeHtml = require('sanitize-html');
const { translate } = require('free-translate');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files from 'public' folder

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per window (1 minute)
  message: 'You have exceeded the 10 requests in 1 minute limit!',
  headers: true,
});
app.use('/chat', limiter);

// Configuration for OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || 'YOUR_API_KEY_HERE',
});
const openai = new OpenAIApi(configuration);

// Conversation History
let conversationHistory = {};

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'chat.html'));
});

// Test database route
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.status(200).send(`Database connected successfully: ${result.rows[0].now}`);
  } catch (error) {
    logger.error('Database test failed', error);
    res.status(500).send('Failed to connect to database');
  }
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const startTime = Date.now();
  try {
    const { userInput, sessionId = 'default' } = req.body;

    // Validate and sanitize input
    const sanitizedInput = sanitizeHtml(userInput);
    if (!sanitizedInput) {
      return res.status(400).json({ error: 'Invalid input provided.' });
    }

    // Detect language
    const detectedLanguage = franc(sanitizedInput);
    let translatedInput = sanitizedInput;
    let shouldTranslateBack = false;

    // If detected language is not English, translate to English
    if (detectedLanguage !== 'eng') {
      translatedInput = await translate(sanitizedInput, { from: detectedLanguage, to: 'en' });
      shouldTranslateBack = true;
    }

    // Maintain conversation history
    conversationHistory[sessionId] = conversationHistory[sessionId] || [];
    conversationHistory[sessionId].push({ role: 'user', content: translatedInput });

    // Get response from OpenAI
    const openAIResponse = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: conversationHistory[sessionId],
    });

    let botResponse = openAIResponse.data.choices[0].message.content;

    // Translate back to the original language if necessary
    if (shouldTranslateBack) {
      botResponse = await translate(botResponse, { from: 'en', to: detectedLanguage });
    }

    // Add bot response to conversation history
    conversationHistory[sessionId].push({ role: 'assistant', content: botResponse });

    // Simulate typing delay
    setTimeout(() => {
      res.status(200).json({ response: botResponse });
    }, Math.random() * 1000 + 500); // Delay between 0.5 to 1.5 seconds

    // Log metadata for analytics
    const responseTime = Date.now() - startTime;
    logger.info(`User language detected: ${detectedLanguage}, Response time: ${responseTime} ms`);
  } catch (error) {
    logger.error('Error communicating with OpenAI', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// Session Timeout Cleanup
setInterval(() => {
  const timeout = 15 * 60 * 1000; // 15 minutes
  const now = Date.now();

  for (const sessionId in conversationHistory) {
    if (conversationHistory[sessionId].lastActive < now - timeout) {
      delete conversationHistory[sessionId];
    }
  }
}, 10 * 60 * 1000); // Run every 10 minutes

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;
