const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const path = require('path');
const openai = require('./openaiClient');
const promptEngineering = require('./promptEngineering');
const entityExtraction = require('./entityExtraction');
const contextManager = require('./contextManager');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
  const { message, sessionId = 'default', context = {} } = req.body;
  
  try {
    // Load or create session context
    const sessionContext = await contextManager.loadContext(sessionId);
    
    // Extract entities
    const entities = await entityExtraction.extractEntities(message);
    const enrichedEntities = await entityExtraction.enrichEntities(entities);
    
    // Update context with new entities
    await contextManager.updateContext(sessionId, { entities: enrichedEntities });
    
    // Build prompt with context
    const promptData = promptEngineering.buildPrompt(
      context.category || 'general',
      enrichedEntities,
      message,
      sessionContext.history || []
    );
    
    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: promptData.systemMessage },
        { role: 'user', content: `${promptData.context}\n\n${message}` }
      ],
      temperature: 0.7
    });
    
    const response = completion.choices[0].message.content;
    
    // Update conversation history
    await contextManager.updateContext(sessionId, {
      history: [...(sessionContext.history || []), 
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ]
    });
    
    res.json({ response, entities: enrichedEntities });
  } catch (error) {
    logger.error('Chat error:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = app;