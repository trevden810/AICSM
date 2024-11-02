// src/openaiClient.js

// Import the OpenAI module and necessary classes.
const { OpenAI } = require('openai');

// Load the API key from an environment variable or directly set it here.
const apiKey = process.env.OPENAI_API_KEY || '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';

// Instantiate the OpenAI client using the API key.
const openai = new OpenAI({
  apiKey: apiKey,
});

// Export the OpenAI instance to be used elsewhere in the project.
module.exports = openai;
