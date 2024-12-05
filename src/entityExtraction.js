const openai = require('./openaiClient');

async function extractEntities(text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Extract and categorize entities from the following text. Return as JSON with types: person, organization, product, date, location, amount.'
      },
      { role: 'user', content: text }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
}

async function enrichEntities(entities) {
  // Query database or external APIs for additional entity information
  const enriched = {...entities};
  
  for (const category in enriched) {
    for (const entity of enriched[category]) {
      entity.metadata = await fetchEntityMetadata(entity);
    }
  }
  
  return enriched;
}

async function fetchEntityMetadata(entity) {
  // Implement metadata fetching logic
  return {};
}

module.exports = {
  extractEntities,
  enrichEntities
};