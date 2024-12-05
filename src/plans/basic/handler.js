const nlu = require('../../nlu');
const config = require('./config');

class BasicPlanHandler {
  constructor() {
    this.activeConnections = 0;
  }

  async handleCall(input, sessionId) {
    if (this.activeConnections >= config.limits.maxConcurrentCalls) {
      return this.handleQueueOrVoicemail(sessionId);
    }

    this.activeConnections++;
    try {
      const response = await nlu.processMessage(input, sessionId);
      return this.formatResponse(response);
    } finally {
      this.activeConnections--;
    }
  }

  formatResponse(nluResponse) {
    return {
      text: nluResponse.response,
      intent: nluResponse.intent.type,
      followUp: this.needsFollowUp(nluResponse)
    };
  }

  needsFollowUp(response) {
    return response.intent.confidence < 0.8;
  }
}

module.exports = new BasicPlanHandler();