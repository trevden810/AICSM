const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const nlu = require('./nlu');

const app = express();
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const { message, sessionId = 'default' } = req.body;
  
  try {
    const result = await nlu.processMessage(message, sessionId);
    res.json(result);
  } catch (error) {
    logger.error('Chat error:', error);
    res.status(500).json({ error: 'Processing error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = app;