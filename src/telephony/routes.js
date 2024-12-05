const express = require('express');
const router = express.Router();
const TwilioHandler = require('./twilio');

const twilioHandler = new TwilioHandler({
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  fromNumber: process.env.TWILIO_PHONE_NUMBER
});

router.post('/voice/incoming', async (req, res) => {
  const response = await twilioHandler.handleIncomingCall(req);
  res.type('text/xml');
  res.send(response);
});

router.post('/voice/process', async (req, res) => {
  const response = await twilioHandler.processVoiceInput(req);
  res.type('text/xml');
  res.send(response);
});

router.post('/voice/transfer', async (req, res) => {
  const response = await twilioHandler.transferToHuman(req);
  res.type('text/xml');
  res.send(response);
});

module.exports = router;