const openai = require('../openaiClient');

class ResponseGenerator {
  async generate(intent, entities, context) {
    const prompt = this.buildPrompt(intent, entities, context);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful customer service AI.'
        },
        { role: 'user', content: prompt }
      ]
    });
    return completion.choices[0].message.content;
  }

  buildPrompt(intent, entities, context) {
    return `
      Intent: ${JSON.stringify(intent)}
      Entities: ${JSON.stringify(entities)}
      Context: ${JSON.stringify(context)}
      Generate appropriate response:
    `;
  }
}

module.exports = new ResponseGenerator();