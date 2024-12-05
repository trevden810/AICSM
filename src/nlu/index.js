const intentProcessor = require('./intentProcessor');
const entityExtractor = require('./entityExtractor');
const contextManager = require('./contextManager');
const responseGenerator = require('./responseGenerator');

async function processMessage(text, sessionId) {
  const context = await contextManager.get(sessionId);
  const intent = await intentProcessor.detectIntent(text, context);
  const entities = await entityExtractor.extract(text, [intent]);
  
  const enrichedIntent = await intentProcessor.enrichIntent(intent, context);
  const resolvedEntities = await entityExtractor.resolveReferences(entities, context);
  
  await contextManager.update(sessionId, {
    intents: [...context.intents, enrichedIntent],
    entities: { ...context.entities, ...resolvedEntities }
  });
  
  const response = await responseGenerator.generate(
    enrichedIntent,
    resolvedEntities,
    context
  );
  
  return { intent: enrichedIntent, entities: resolvedEntities, response };
}

module.exports = { processMessage };