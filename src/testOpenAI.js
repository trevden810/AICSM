// src/testOpenAI.js

// Import the OpenAI client.
const openai = require('./openaiClient');

console.log('Starting OpenAI test...');

async function runTest() {
  try {
    // Create a chat completion request using the new OpenAI method.
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "user", content: "Hello, how are you?" }
      ],
    });

    // Log the response from OpenAI.
    console.log("Response from OpenAI:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error communicating with OpenAI:", error.message);
  }

  console.log("Test finished.");
}

runTest();
