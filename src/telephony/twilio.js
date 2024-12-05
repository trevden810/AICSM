const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const nlu = require('../nlu');

class TwilioHandler {
  constructor(config) {
    this.client = twilio(config.accountSid, config.authToken);
    this.fromNumber = config.fromNumber;
  }

  async handleIncomingCall(req) {
    const response = new VoiceResponse();
    const gather = response.gather({
      input: 'speech',
      action: '/voice/process',
      language: 'en-US',
      speechTimeout: 'auto'
    });

    gather.say('Welcome to Red Rocks Grill. How may I assist you today?');
    return response.toString();
  }

  async processVoiceInput(req) {
    const response = new VoiceResponse();
    const speechResult = req.body.SpeechResult;

    try {
      const nluResult = await nlu.processMessage(speechResult, req.body.CallSid);
      response.say({ voice: 'Polly.Amy' }, nluResult.response);
      
      // Continue conversation
      const gather = response.gather({
        input: 'speech',
        action: '/voice/process'
      });
      gather.say('Is there anything else I can help you with?');
    } catch (error) {
      response.say('I apologize, but I\'m having trouble understanding. Could you please repeat that?');
    }

    return response.toString();
  }

  async transferToHuman(req) {
    const response = new VoiceResponse();
    response.say('Transferring you to a team member. Please hold.');
    response.dial(process.env.FALLBACK_NUMBER);
    return response.toString();
  }
}

module.exports = TwilioHandler;