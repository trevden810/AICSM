const express = require('express');
const handler = require('./handler');
const router = express.Router();

router.post('/call', async (req, res) => {
  const { input, sessionId } = req.body;
  const response = await handler.handleCall(input, sessionId);
  res.json(response);
});

router.get('/status', (req, res) => {
  res.json({
    active: handler.activeConnections,
    available: true
  });
});

module.exports = router;