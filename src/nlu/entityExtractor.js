const openai = require('../openaiClient');

class EntityExtractor {
  async extract(text, intents = []) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Extract named entities and their relationships. Return JSON.'
        },
        { role: 'user', content: text }
      ],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(completion.choices[0].message.content);
  }

  async resolveReferences(entities, context) {
    return entities.map(entity => ({
      ...entity,
      resolved: this.findInContext(entity, context)
    }));
  }

  findInContext(entity, context) {
    // Implement context search logic
    return entity;
  }
}

module.exports = new EntityExtractor();