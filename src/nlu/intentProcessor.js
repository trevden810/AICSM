const openai = require('../openaiClient');

class IntentProcessor {
  async detectIntent(text, context = {}) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Analyze user intent and extract key parameters. Return JSON.'
        },
        { role: 'user', content: text }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(completion.choices[0].message.content);
  }

  async validateIntent(intent, allowedIntents) {
    return allowedIntents.includes(intent.type);
  }

  async enrichIntent(intent, context) {
    return {
      ...intent,
      timestamp: Date.now(),
      confidence: this.calculateConfidence(intent),
      context
    };
  }

  calculateConfidence(intent) {
    // Implement confidence scoring logic
    return 0.95;
  }
}

module.exports = new IntentProcessor();